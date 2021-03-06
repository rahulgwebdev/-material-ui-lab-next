import * as React from 'react';
import { PaperProps as MuiPaperProps } from '@material-ui/core/Paper';
import { PopperProps as MuiPopperProps } from '@material-ui/core/Popper';
import { TrapFocusProps as MuiTrapFocusProps } from '@material-ui/core/Unstable_TrapFocus';
import { MuiStyles } from '@material-ui/core/styles';
import { TransitionProps as MuiTransitionProps } from '@material-ui/core/transitions';
export interface ExportedPickerPopperProps {
    /**
     * Popper props passed down to [Popper](https://material-ui.com/api/popper/) component.
     */
    PopperProps?: Partial<MuiPopperProps>;
    /**
     * Custom component for popper [Transition](https://material-ui.com/components/transitions/#transitioncomponent-prop).
     */
    TransitionComponent?: React.ComponentType<MuiTransitionProps>;
}
export interface PickerPopperProps extends ExportedPickerPopperProps, MuiPaperProps {
    role: 'tooltip' | 'dialog';
    TrapFocusProps?: Partial<MuiTrapFocusProps>;
    anchorEl: MuiPopperProps['anchorEl'];
    open: MuiPopperProps['open'];
    containerRef?: React.Ref<HTMLDivElement>;
    onClose: () => void;
}
export declare type PickersPopperClassKey = 'root' | 'paper' | 'topTransition';
export declare const styles: MuiStyles<PickersPopperClassKey>;
declare const _default: React.JSXElementConstructor<Omit<PickerPopperProps & {
    classes: import("@material-ui/styles").ClassNameMap<PickersPopperClassKey>;
} & {
    children?: React.ReactNode;
}, "classes"> & import("@material-ui/core/styles").StyledComponentProps<PickersPopperClassKey> & object>;
export default _default;
