import React, {FC} from 'react';

interface CampaignDetailProps {
  name?: string;
}
const CampaignDetail: FC<CampaignDetailProps> = (props) => {
  return (
    <div>
      <h4>CampaignDetail</h4>
    </div>
  );
};

export default CampaignDetail;
