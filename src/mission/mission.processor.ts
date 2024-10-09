import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MissionService } from './mission.service';

@Processor('mission-queue') // Procesador para la cola 'mission-queue'
export class MissionProcessor {
  constructor(private readonly missionService: MissionService) {}

  @Process('unlock-mission') // Define el tipo de trabajo
  async handleMissionUnlock(job: Job) {
    const { plantUserId } = job.data; // Datos pasados al job, aquí el plantUserId
    console.log(`Desbloqueando misiones para la planta del usuario ${plantUserId}`);
    
    // Desbloquear misiones
    // await this.missionService.unlockMissions(plantUserId);
  }
}
