import { serverApi, vtdApi } from 'shared/api/api';

import { setInterceptors } from '../helpers/setInterceptors';

setInterceptors(serverApi);
setInterceptors(vtdApi);
