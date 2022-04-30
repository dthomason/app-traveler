import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readonly getConstants: () => {};

  // your module methods go here, for example:
  getString(id: string): Promise<string>;
}

export default TurboModuleRegistry.get<Spec>('<MODULE_NAME>');