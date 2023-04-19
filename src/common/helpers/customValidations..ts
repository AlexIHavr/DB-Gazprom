import { BadRequestException } from '@nestjs/common';

export const hourValidation = (value: string) => {
  let isValidHour = false;
  if (value.includes(':')) isValidHour = /^(0[1-9]|1[0-1]):([0-5][0-9])$/.test(value);

  const hour = Number(value);
  if (!isNaN(hour)) isValidHour = +hour >= 0 || +hour <= 12;

  if (!isValidHour) throw new BadRequestException('Invalid hour format');
};
