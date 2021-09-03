import React, { useState } from 'react';
import FormikApp from '../shared/components/UIElements/FormElements/FormikApp';
import FormikENV from '../shared/components/UIElements/FormElements/FormikENV';
import FormikSSH from '../shared/components/UIElements/FormElements/FormikSSH';

const steps = ['Add SSH Key', 'Add app', 'Environment Varibles'];


const Setup = () => {
  const [activeStep, setActiveStep] = useState(0);
  // const isLastStep = activeStep === steps.length - 1;
  const [appSSHForm, setAppSSHForm] = useState({
    host: '',
    username: '',
    sshName: '',
    identity: '',
  });
  const [appSetupForm, setAppSetupForm] = useState({
    app: '',
    repo: '',
    title: '',
    description: '',
  });
  const [envVariabeForm, setEnvVariableForm] = useState({
    env: [
      {
        var: 'COMMUNITY_NAME',
        val: '',
      },
      {
        var: 'DOMAIN_NAME',
        val: '',
      },
    ],
  });


  const _renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <FormikSSH appSSHForm={appSSHForm} setAppSSHForm={setAppSSHForm} setActiveStep={setActiveStep} />;
      case 1:
        return <FormikApp appSetupForm={appSetupForm} setAppSetupForm={setAppSetupForm} setActiveStep={setActiveStep} />;
      case 2:
        return <FormikENV envVariabeForm={envVariabeForm} setEnvVariableForm={setEnvVariableForm} setActiveStep={setActiveStep} />;
      default:
        return <div>Not Found</div>;
    }
  }

  return _renderStepContent(activeStep);
};

export default Setup;
