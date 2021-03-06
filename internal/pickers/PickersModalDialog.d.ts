import * as React from 'react';
import { DialogProps as MuiDialogProps } from '@material-ui/core/Dialog';
import { MuiStyles } from '@material-ui/core/styles';
export interface ExportedPickerModalProps {
    /**
     * Ok button text.
     * @default "OK"
     */
    okText?: React.ReactNode;
    /**
     * Cancel text message.
     * @default "CANCEL"
     */
    cancelText?: React.ReactNode;
    /**
     * Clear text message.
     * @default "CLEAR"
     */
    clearText?: React.ReactNode;
    /**
     * Today text message.
     * @default "TODAY"
     */
    todayText?: React.ReactNode;
    /**
     * If `true`, it shows the clear action in the picker dialog.
     * @default false
     */
    clearable?: boolean;
    /**
     * If `true`, the today button is displayed. **Note** that `showClearButton` has a higher priority.
     * @default false
     */
    showTodayButton?: boolean;
    /**
     * Props applied to the [`Dialog`](/api/dialog/) element.
     */
    DialogProps?: Partial<MuiDialogProps>;
}
export interface PickersModalDialogProps extends ExportedPickerModalProps {
    onAccept: () => void;
    onClear: () => void;
    onDismiss: () => void;
    onSetToday: () => void;
    open: boolean;
}
export declare type PickersModalDialogClassKey = 'container' | 'paper' | 'content' | 'action' | 'withAdditionalAction';
export declare const styles: MuiStyles<PickersModalDialogClassKey>;
declare const _default: React.JSXElementConstructor<Omit<PickersModalDialogProps & {
    classes: import("@material-ui/styles").ClassNameMap<PickersModalDialogClassKey>;
} & {
    children?: React.ReactNode;
}, "classes"> & import("@material-ui/core/styles").StyledComponentProps<PickersModalDialogClassKey> & object>;
export default _default;
