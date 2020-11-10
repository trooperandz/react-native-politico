import React, { RefObject, createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef: RefObject<NavigationContainerRef> = createRef();
export function navigate(name: string, params: any) {
  //perform navigation when app has mounted
  navigationRef.current?.navigate(name, params);
}
