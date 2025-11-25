import { InjectionToken } from '@needle-di/core';
import { DataSource } from 'typeorm';

import { Service } from './service';

export const DataSourceToken = new InjectionToken<DataSource>('DATA_SOURCE');
export const ServiceToken = new InjectionToken<Service>('SERVICE');
