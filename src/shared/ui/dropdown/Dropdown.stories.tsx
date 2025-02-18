import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "@/shared/ui/dropdown/Dropdown";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Typography } from "@/shared/ui/typography";
import {MoreHorizontalIcon} from "@/shared/assets/icons/MoreHorizontalIcon";

const meta = {
    title: "Components/Dropdown",
    component: Dropdown,
    tags: ["autodocs"],
    argTypes: {
        isArrow: { control: "boolean" },
        labelName: { control: "text" },
    },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const dropdownItems = (
    <>
        <DropdownMenu.Item>
            <Typography>Option 1</Typography>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <Typography>Option 2</Typography>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <Typography>Option 3</Typography>
        </DropdownMenu.Item>
    </>
);

export const Default: Story = {
    args: {
        iconTrigger: <MoreHorizontalIcon/>,
        isArrow: true,
        labelName: "Menu",
        children: dropdownItems,
    },
};

export const WithoutArrow: Story = {
    args: {
        iconTrigger:<MoreHorizontalIcon/>,
        isArrow: false,
        labelName: "No Arrow",
        children: dropdownItems,
    },
};

export const NoLabel: Story = {
    args: {
        iconTrigger:<MoreHorizontalIcon/>,
        isArrow: true,
        labelName: "",
        children: dropdownItems,
    },
};
