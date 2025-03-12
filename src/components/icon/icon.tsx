import React from "react";
import { type IconName, iconNameToIcon } from './common.js';

type Properties = {
  iconName: IconName;
  className?: string;
};

export const Icon: React.FC<Properties> = ({iconName, className}) => {
  const SvgIcon = iconNameToIcon[iconName];

  return <SvgIcon className={className} />;
};