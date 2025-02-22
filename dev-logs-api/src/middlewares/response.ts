import { MessageConstants } from '../constants/messages';
import { ApiResponse } from '../utils/ApiResponse';

export const responseHandler = (err: any, req: any, res: any, next: any) => {
  if (err instanceof ApiResponse) {
    res.status(err.status).json(err);
    return;
  }

  res.status(500).json(ApiResponse.internal(MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, 500, req.originalUrl));
};
