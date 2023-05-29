import { ModelAttributeColumnOptions } from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { HOUR_OPTIONS, UNSIGNED_FLOAT_OPTIONS, UNSIGNED_SMALLINT_OPTIONS } from 'src/common/consts/modelColumnOptions';

import { ColumnNames } from '../types/alias';

export const COLUMN_ALIASES = {
  number: {
    name: 'number',
    alias: 'Номер',
  },
  tubeNumber: {
    name: 'tubeNumber',
    alias: 'Номер трубы',
    options: { type: DataType.STRING, allowNull: false } as ModelAttributeColumnOptions,
  },
  tubeNumberPrev: {
    name: 'tubeNumberPrev',
    alias: 'Номер трубы предыдущего ВТД',
  },
  comment: {
    name: 'comment',
    alias: 'Комментарий',
  },
  tubeComment: {
    name: 'tubeComment',
    alias: 'Комментарий к трубе',
    options: { type: DataType.TEXT } as ModelAttributeColumnOptions,
  },
  latitude: {
    name: 'latitude',
    alias: 'Широта',
  },
  longitude: {
    name: 'longitude',
    alias: 'Долгота',
  },
  altitude: {
    name: 'altitude',
    alias: 'Высота',
  },
  distance: {
    name: 'distance',
    alias: 'Расстояние, м',
    options: { ...UNSIGNED_FLOAT_OPTIONS, allowNull: false } as ModelAttributeColumnOptions,
  },
  tubeLength: {
    name: 'tubeLength',
    alias: 'Длина трубы, м',
    options: { ...UNSIGNED_FLOAT_OPTIONS, allowNull: false } as ModelAttributeColumnOptions,
  },
  equipmentLength: {
    name: 'equipmentLength',
    alias: 'Длина, м',
    options: { ...UNSIGNED_FLOAT_OPTIONS } as ModelAttributeColumnOptions,
  },
  type: {
    name: 'type',
    alias: 'Тип',
    options: { type: DataType.STRING, allowNull: false } as ModelAttributeColumnOptions,
  },
  weldType: {
    name: 'weldType',
    alias: 'Тип сварного шва',
    options: { type: DataType.STRING } as ModelAttributeColumnOptions,
  },
  inputLongWeld: {
    name: 'inputLongWeld',
    alias: 'Входящий ПШ, ч:мин',
  },
  outputLongWeld: {
    name: 'outputLongWeld',
    alias: 'Выходящий ПШ, ч:мин',
  },
  thickness: {
    name: 'thickness',
    alias: 'Толщина, мм',
  },
  fromLeftWeldToMaxPoint: {
    name: 'fromLeftWeldToMaxPoint',
    alias: 'От левого шва до точки максимума, м',
  },
  fromLeftWeldToStart: {
    name: 'fromLeftWeldToStart',
    alias: 'От левого шва до начала, м',
  },
  fromRightWeldToMaxPoint: {
    name: 'fromRightWeldToMaxPoint',
    alias: 'От правого шва до точки максимума, м',
  },
  fromRightWeldToStart: {
    name: 'fromRightWeldToStart',
    alias: 'От правого шва до начала, м',
  },
  fromLongWeldToMaxPoint: {
    name: 'fromLongWeldToMaxPoint',
    alias: 'От продольного шва до точки максимума, мм',
  },
  fromLongWeldToCenter: {
    name: 'fromLongWeldToCenter',
    alias: 'От продольного шва до центра, мм',
  },
  fromLongWeldToStart: {
    name: 'fromLongWeldToStart',
    alias: 'От продольного шва до точки начала дефекта, мм',
    options: { type: DataType.SMALLINT } as ModelAttributeColumnOptions,
  },
  minDistanceToLongWeld: {
    name: 'minDistanceToLongWeld',
    alias: 'Минимальное расстояние до продольного шва, мм',
  },
  minDistanceToWeld: {
    name: 'minDistanceToWeld',
    alias: 'Минимальное расстояние до кольцевого шва, мм',
  },
  fromRefPoint: {
    name: 'fromRefPoint',
    alias: 'От репера, м',
  },
  toRefPoint: {
    name: 'toRefPoint',
    alias: 'До репера, м',
  },
  characterType: {
    name: 'characterType',
    alias: 'Тип особенности',
    options: { type: DataType.STRING, allowNull: false } as ModelAttributeColumnOptions,
  },
  characterSort: {
    name: 'characterSort',
    alias: 'Характер особенности',
  },
  sizeClass: {
    name: 'sizeClass',
    alias: 'Класс размера',
  },
  description: {
    name: 'description',
    alias: 'Описание',
    options: { type: DataType.STRING } as ModelAttributeColumnOptions,
  },
  abbreviationType: {
    name: 'abbreviationType',
    alias: 'Тип аббр.',
    options: { type: DataType.STRING, allowNull: false } as ModelAttributeColumnOptions,
  },
  abbreviationSort: {
    name: 'abbreviationSort',
    alias: 'Характер аббр.',
  },
  abbreviationSizeClass: {
    name: 'abbreviationSizeClass',
    alias: 'Класс размера аббр.',
  },
  maxOrientation: {
    name: 'maxOrientation',
    alias: 'Ориентация точки максимума, ч:мин',
  },
  centerOrientation: {
    name: 'centerOrientation',
    alias: 'Ориентация центра, ч:мин',
  },
  startOrientation: {
    name: 'startOrientation',
    alias: 'Ориентация точки начала дефекта, ч:мин',
    options: { ...HOUR_OPTIONS } as ModelAttributeColumnOptions,
  },
  length: {
    name: 'length',
    alias: 'Длина, мм',
  },
  width: {
    name: 'width',
    alias: 'Ширина, мм',
  },
  depth: {
    name: 'depth',
    alias: 'Глубина, %',
  },
  position: {
    name: 'position',
    alias: 'Расположение',
  },
  outsideInspectionTime: {
    name: 'outsideInspectionTime',
    alias: 'Срок НО, лет',
    options: { ...UNSIGNED_FLOAT_OPTIONS } as ModelAttributeColumnOptions,
  },
  PSC: {
    name: 'PSC',
    alias: 'КБД',
    options: { ...UNSIGNED_FLOAT_OPTIONS } as ModelAttributeColumnOptions,
  },
  Pd: {
    name: 'Pd',
    alias: 'Pd, МПа',
    options: { ...UNSIGNED_FLOAT_OPTIONS } as ModelAttributeColumnOptions,
  },
  MAOP: {
    name: 'MAOP',
    alias: 'MAOP, МПа',
    options: { ...UNSIGNED_FLOAT_OPTIONS } as ModelAttributeColumnOptions,
  },
  Psw: {
    name: 'Psw',
    alias: 'Psw, МПа',
    options: { ...UNSIGNED_FLOAT_OPTIONS } as ModelAttributeColumnOptions,
  },
  Pf: {
    name: 'Pf',
    alias: 'Pf, МПа',
    options: { ...UNSIGNED_FLOAT_OPTIONS } as ModelAttributeColumnOptions,
  },
  danger: {
    name: 'danger',
    alias: 'Опасность',
    options: { type: DataType.STRING } as ModelAttributeColumnOptions,
  },
  startOdometer: {
    name: 'startOdometer',
    alias: 'Начало, м',
  },
  endOdometer: {
    name: 'endOdometer',
    alias: 'Конец, м',
  },
  segmentsCount: {
    name: 'segmentsCount',
    alias: 'Число сегментов',
  },
  bendRadius: {
    name: 'bendRadius',
    alias: 'Радиус, м',
  },
  bendAngle: {
    name: 'bendAngle',
    alias: 'Угол изгиба, Град.',
  },
  angleInProjection: {
    name: 'angleInProjection',
    alias: 'Угол в проекции, Град.',
  },
  direction: {
    name: 'direction',
    alias: 'Направление',
  },
  anomaliesCount: {
    name: 'anomaliesCount',
    alias: 'Аномалий',
    options: { ...UNSIGNED_SMALLINT_OPTIONS, allowNull: false } as ModelAttributeColumnOptions,
  },
  SMYS: {
    name: 'SMYS',
    alias: 'SMYS, МПа',
    options: { ...UNSIGNED_FLOAT_OPTIONS, allowNull: false } as ModelAttributeColumnOptions,
  },
  SMTS: {
    name: 'SMTS',
    alias: 'SMTS, МПа',
    options: { ...UNSIGNED_FLOAT_OPTIONS, allowNull: false } as ModelAttributeColumnOptions,
  },
  plotCategory: {
    name: 'plotCategory',
    alias: 'Категория участка',
    options: { type: DataType.STRING, allowNull: false } as ModelAttributeColumnOptions,
  },
  constructionalFactor: {
    name: 'constructionalFactor',
    alias: 'Конструкционный фактор',
  },
  materialReliability: {
    name: 'materialReliability',
    alias: 'Коэффициент надёжности по материалу',
    options: { ...UNSIGNED_FLOAT_OPTIONS, allowNull: false } as ModelAttributeColumnOptions,
  },
  isolationType: {
    name: 'isolationType',
    alias: 'Тип изоляции',
  },
  square: {
    name: 'square',
    alias: 'Площадь, %',
  },
  steelMark: {
    name: 'steelMark',
    alias: 'Марка стали',
    options: { type: DataType.STRING } as ModelAttributeColumnOptions,
  },
  temperatureDifference: {
    name: 'temperatureDifference',
    alias: 'Температурный перепад',
  },
  title: {
    name: 'title',
    alias: 'Название',
    options: { type: DataType.STRING } as ModelAttributeColumnOptions,
  },
  summaryValue: {
    name: 'summaryValue',
    alias: 'Значение',
  },
  nextMarkDistance: {
    name: 'nextMarkDistance',
    alias: 'До след. реп. точки, м',
  },
  tapSection: {
    name: 'tapSection',
    alias: 'Межкрановый участок',
  },
  km: {
    name: 'km',
    alias: 'КМ',
  },
} as const;

export const COLUMN_NAMES = Object.values(COLUMN_ALIASES).reduce<ColumnNames>((prev, columnAlias) => {
  prev[columnAlias.alias] = columnAlias.name;
  return prev;
}, {});
