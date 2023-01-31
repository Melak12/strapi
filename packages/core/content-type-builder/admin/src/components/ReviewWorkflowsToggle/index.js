import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Checkbox } from '@strapi/design-system';
import { ConfirmDialog } from '@strapi/helper-plugin';
import { getTrad } from '../../utils';

const ReviewWorkflowsToggle = ({
  description,
  disabled,
  intlLabel,
  isCreating,
  name,
  onChange,
  value,
}) => {
  const { formatMessage } = useIntl();
  const [showWarning, setShowWarning] = useState(false);
  const label = intlLabel.id
    ? formatMessage(
        { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
        { ...intlLabel.values }
      )
    : name;

  const hint = description
    ? formatMessage(
        { id: description.id, defaultMessage: description.defaultMessage },
        { ...description.values }
      )
    : '';

  const handleToggle = () => setShowWarning((prev) => !prev);

  const handleConfirm = () => {
    onChange({ target: { name, value: false } });

    handleToggle();
  };

  const handleChange = ({ target: { checked } }) => {
    if (!checked && !isCreating) {
      handleToggle();

      return;
    }

    onChange({ target: { name, value: checked } });
  };

  return (
    <>
      <Checkbox checked={value} disabled={disabled} hint={hint} name={name} onChange={handleChange}>
        {label}
      </Checkbox>

      <ConfirmDialog
        isOpen={showWarning}
        onToggleDialog={handleToggle}
        onConfirm={handleConfirm}
        bodyText={{
          id: getTrad('popUpWarning.review-workflows.message'),
          defaultMessage:
            'If you disable review workflow, the associated workflow-data with this content-type will be deleted.',
        }}
        leftButtonText={{
          id: 'components.popUpWarning.button.cancel',
          defaultMessage: 'No, cancel',
        }}
        rightButtonText={{
          id: getTrad('popUpWarning.review-workflows.button.confirm'),
          defaultMessage: 'Yes, disable',
        }}
      />
    </>
  );
};

ReviewWorkflowsToggle.defaultProps = {
  description: null,
  disabled: false,
  value: false,
};

ReviewWorkflowsToggle.propTypes = {
  description: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }),
  disabled: PropTypes.bool,
  intlLabel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }).isRequired,
  isCreating: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool,
};

export default ReviewWorkflowsToggle;
