/**
 * Hoc -- FormModal
 *
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type */
import React from 'react';
import {Modal, Form} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {ModalProps} from 'antd/lib/modal';

/* HocModal 的 props */
interface HocModalFormProps<F, FV = any> {
  title: string;
  visible: boolean;
  formValue?: FV;
  modal?: ModalProps;
  onChange: (value: boolean) => void; // 打开、隐藏 Modal
  onSubmit:
    | ((values: F, formValue?: FV) => void)
    | ((values: F, formValue?: FV) => Promise<void>);
}

interface PickModalProps<FV> {
  formValue?: FV;
}

export default function withModalForm<
  Props,
  F extends object = {},
  FV extends object = {}
>(
  WrappedComponent: React.ComponentType<
    Props & FormComponentProps<F> & PickModalProps<FV>
  >
) {
  class ModalCom extends React.Component<
    Props & HocModalFormProps<F, FV> & FormComponentProps<F>
  > {
    public state = {
      confirmLoading: false,
      errorMsg: '',
    };

    private handleSubmit = (): void => {
      this.props.form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        try {
          this.setState({confirmLoading: true});
          await this.props.onSubmit(values, this.props.formValue);
          this.setState({confirmLoading: false});
          this.props.onChange(false);
        } catch (error) {
          this.setState({
            confirmLoading: false,
            errorMsg: error.message,
          });
        }
      });
    };

    private hideModel = (): void => {
      this.props.onChange(false);
    };

    private resetData = (): void => {
      this.setState({confirmLoading: false, errorMsg: ''});
    };

    public render(): React.ReactNode {
      const {visible, title, onChange, onSubmit, ...restProps} = this.props;
      return (
        <Modal
          {...this.props.modal}
          destroyOnClose={true}
          maskClosable={false}
          title={this.props.title}
          visible={this.props.visible}
          confirmLoading={this.state.confirmLoading}
          onOk={this.handleSubmit}
          onCancel={this.hideModel}
          afterClose={this.resetData}
        >
          {this.state.errorMsg && (
            <div style={{color: '#FF0000', paddingBottom: 16}}>
              {this.state.errorMsg}
            </div>
          )}
          <WrappedComponent
            {...(restProps as Props &
              FormComponentProps<F> &
              PickModalProps<FV>)}
          />
        </Modal>
      );
    }
  }

  const ModalForm = Form.create<
    HocModalFormProps<F, FV> & Props & FormComponentProps<F>
  >()(ModalCom);
  return ModalForm;
}
