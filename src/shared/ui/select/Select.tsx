import * as React from "react";
import * as SelectRadix from '@radix-ui/react-select'
// import classnames from "classnames";

import s from "./Select.module.scss";
import {SelectItem} from "@radix-ui/react-select";

export const SelectBox = () => (
    <SelectRadix.Root>
        <SelectRadix.Trigger className={s.Trigger} aria-label="Food">
            <SelectRadix.Value placeholder="Select a fruit…" />
            <SelectRadix.Icon className={s.Icon}>
                {/*<ChevronDownIcon />*/}
            </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
            <SelectRadix.Content className={s.Content}>
                <SelectRadix.ScrollUpButton className={s.ScrollButton}>
                    {/*<ChevronUpIcon />*/}
                </SelectRadix.ScrollUpButton>
                <SelectRadix.Viewport className={s.Viewport}>
                    <SelectRadix.Group>
                        <SelectRadix.Label className={s.Label}>Fruits</SelectRadix.Label>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectRadix.Group>
                </SelectRadix.Viewport>
                <SelectRadix.ScrollDownButton className={s.ScrollButton}>
                    {/*<ChevronDownIcon />*/}
                </SelectRadix.ScrollDownButton>
            </SelectRadix.Content>
        </SelectRadix.Portal>
    </SelectRadix.Root>
);

// export const SelectItem = React.forwardRef(
//     ({ children, className, ...props }, forwardedRef) => {
//         return (
//             <SelectRadix.Item
//                 className={classnames(s.Item, className)}
//                 {...props}
//                 ref={forwardedRef}
//             >
//                 <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
//                 <SelectRadix.ItemIndicator className={s.ItemIndicator}>
//                     {/*<CheckIcon />*/}
//                 </SelectRadix.ItemIndicator>
//             </SelectRadix.Item>
//         );
//     },
// );


