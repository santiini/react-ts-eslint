/* eslint-disable @typescript-eslint/no-parameter-properties */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/**
 * TS--Class
 */
export const name = 'Class';

/**
 * 三、abstract class
 *   1. 可以作为类型使用;
 *   2. 不能生成实例， 只能为其他 class extends 继承
 *   3. 可以有自己的方法实现
 */
abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log('Department name: ' + this.name);
  }

  abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {
  private _fullName: string = '';

  static customTitle = 'AccountingDepartmentClass';

  constructor() {
    super('Accounting and Auditing'); // constructors in derived classes must call super()
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports(): void {
    console.log('Generating accounting reports...');
  }

  // getter 和 setter
  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (newName.length > 5) {
      this._fullName = newName;
    } else {
      console.log('Error: fullName 长度必须大于 5');
    }
  }

  printFullName(): void {
    console.error(this._fullName);
  }
}

// abstract class 作为类型使用
let department: Department;
// let department: AccountingDepartment;

// department = new Department(); // error
department = new AccountingDepartment();

// 实现类的方法
department.printMeeting();
// extends class 的方法
department.printName();
// department.generateReports(); // error

const accountDepartment = new AccountingDepartment();
accountDepartment.printMeeting();
accountDepartment.printName();
accountDepartment.generateReports();

// accountDepartment._fullName = '111'; // private
