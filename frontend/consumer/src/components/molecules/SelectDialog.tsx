import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { ButtonPropsColorOverrides } from '@mui/material/Button/Button';

export const SelectDialog = ({
  open,
  onClose,
  dialogTitle,
  dialogContentText,
  dialogButtons,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  dialogTitle: string;
  dialogContentText: string;
  dialogButtons: {
    action: () => void;
    label: string;
    color: OverridableStringUnion<
      'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
      ButtonPropsColorOverrides
    >;
  }[];
  isLoading: boolean;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 1 }}>{dialogContentText}</DialogContentText>
        <DialogActions sx={{ pr: 0 }}>
          {dialogButtons.map((button) => {
            return (
              <Button
                variant="contained"
                onClick={button.action}
                color={button.color}
                disabled={isLoading}
                key={button.label}
              >
                {button.label}
              </Button>
            );
          })}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
