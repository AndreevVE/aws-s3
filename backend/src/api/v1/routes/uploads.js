import { Router } from 'express';
import { getUploadUrl } from '#modules/uploads/controllers.js';

const router = Router();

router.post('/upload-url', getUploadUrl);

export default router;
