
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from '../Icon';
import Alert from './index';

export default {
  title: 'DataEntry/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;
export const borderInfo = Template.bind({});
borderInfo.args = {
  title:'You have unsaved changes123',
  content:'You have unsaved changes123',
  visible :true,
  type:'info',
  border:true
};
export const borderSuccess = Template.bind({});
borderSuccess.args = {
  title:'You have unsaved changes123',
  content:'You have unsaved changes123',
  visible :true,
  type:'success',
  border:true
};
export const borderWarning = Template.bind({});
borderWarning.args = {
  title:'You have unsaved changes123',
  content:'You have unsaved changes123',
  visible :true,
  type:'warning',
  border:true
};
export const borderErr = Template.bind({});
borderErr.args = {
  title:'You have unsaved changes123',
  content:'You have unsaved changes123',
  visible :true,
  type:'err',
  border:true
};
export const borderSelfIcon = Template.bind({});
borderSelfIcon.args = {
  title:'You have unsaved changes123',
  content:'You have unsaved changes123',
  visible :true,
  type:'info',
  border:true,
  icon:<Icon color="green" name="chenggong"></Icon>
};

export const noborderInfo = Template.bind({});
noborderInfo.args = {
  title:'You have unsaved changes123',
  content:'You have unsaved changes123',
  visible :true,
  type:'info',
  border:false
};
export const noborderSuccess = Template.bind({});
noborderSuccess.args = {
  content:'You have unsaved changes123',
  visible :true,
  type:'success',
  border:false
};
export const noborderWarning = Template.bind({});
noborderWarning.args = {
  title:'You have unsaved changes123',
  content:'You have unsaved changes123',
  visible :true,
  type:'warning',
  border:false
};
export const noborderErr = Template.bind({});
noborderErr.args = {
  title:'You have unsaved changes123',
  content:'You have unsaved changes123',
  visible :true,
  type:'err',
  border:false,
  // icon:<></>
};
export const noborderSelfIcon = Template.bind({});
noborderSelfIcon.args = {
  title:'You have unsaved changes123',
  content:'You have unsaved changes123',
  visible :true,
  type:'info',
  border:false,
  icon:<Icon color="green" name="chenggong"></Icon>
};

export const noArgs = Template.bind({});
noArgs.args = {

};