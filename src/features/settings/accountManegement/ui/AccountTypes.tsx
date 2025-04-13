import React from 'react';
import {Typography} from "@/shared/ui/typography";
import {useTranslations} from "next-intl";
import {Card} from "@/shared/ui/card";
import s from './styles.module.scss'
import {RadioGroups} from "@/shared/ui/radio-groups";

export const AccountTypes = () => {
    const t = useTranslations('profile.profileSettingsTabs')
    const options = [
        {value: 'Personal', label: 'Personal', id: '0'},
        {value: 'Business', label: 'Business', id: '1'}
    ]

    return (
        <div>
            <div>
                <Typography variant={'h3'}>{t('accountType')}:</Typography>
                <Card className={s.accountTypeContainer}>
                    <RadioGroups options={options} className={s.radioGroup} defaultValue={'Personal'}/>
                </Card>
            </div>
        </div>

    );
};
