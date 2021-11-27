import { Platform } from '../types/game';

export interface IPlatformRepository {
	getPlatforms(): Promise<Platform[]>

	saveOrUpdatePlatform(platform: Platform): Promise<void>
}
