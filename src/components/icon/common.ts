import Test from '@assets/img/icons/test.svg?react';

type IconName = 'test';

const iconNameToIcon: Record<
  IconName,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  test: Test,
};

export { type IconName, iconNameToIcon };
