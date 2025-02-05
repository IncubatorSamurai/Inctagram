import * as React from "react";
import { RadioGroup, RadioGroupItem, Indicator } from "@radix-ui/react-radio-group";
import s from './radio.module.scss';

export const Radio = () => (
    <form>
        <RadioGroup className={s.Root}
            defaultValue="default"
            aria-label="View density">
            <RadioGroupItem className={s.Item} value="compact" id="r3" >
                <Indicator className={s.Indicator} />
            </RadioGroupItem>
            <RadioGroupItem className={s.Item} value="compafct" id="r4">
                <Indicator className={s.Indicator} />
            </RadioGroupItem>
        </RadioGroup>
    </form>
);

