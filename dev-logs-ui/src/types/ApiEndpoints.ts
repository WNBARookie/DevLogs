import type { AreaDataEndpoints } from './AreaDataEndpoints';
import type { ItemDataEndpoints } from './ItemDataEndpoints';
import type { ProjectDataEndpoints } from './ProjectDataEndpoints';
import type { UserDataEndpoints } from './UserDataEndpoints';

export type ApiEndpoints = {
  userData: UserDataEndpoints;
  areaData: AreaDataEndpoints;
  projectData: ProjectDataEndpoints;
  itemData: ItemDataEndpoints;
};
