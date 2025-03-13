import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { VocalizacaoHistoryTems } from "./vocalizacaoTems.history.entity";

@Entity()
export class AlarmesHistoryTems {
  @PrimaryGeneratedColumn()
  readonly id: number;  //AUTOINCREMENTAVEL
  
  @Column({ nullable: true })
  receiveTime:string
  
  @Column({ nullable: true })
  procTime:string
  
  @Column({ nullable: true })
  eventIndex:string
  
  @Column({ nullable: true })
  persistent_byPass:boolean
  
  @Column({ nullable: true })
  persistent_situacao:string
  
  @Column({ nullable: true })
  persistent_serialIdentifier:string
  
  @Column({ nullable: true })
  persistent_localidadeNome:string
  
  @Column({ nullable: true })
  persistent_areaCodigo:string
  
  @Column({ nullable: true })
  persistent_grupo:string
  
  @Column({ nullable: true })
  persistent_frontExclusionRule:string
  
  @Column({ nullable: true })
  persistent_frontSerialIdentifier:string
  
  @Column({ nullable: true })
  persistent_tokenCause:string
  
  @Column({ nullable: true })
  persistent_localidadeCodigo:string
  
  @Column({ nullable: true })
  persistent_severidad:string
  
  @Column({ nullable: true })
  persistent_alarmLookupKey:string
  
  @Column({ nullable: true })
  persistent_curtoTally:string
  
  @Column({ nullable: true })
  persistent_uuid:string
  
  @Column({ nullable: true })
  persistent_tempoEncerramento:string
  
  @Column({ nullable: true })
  persistent_centralMae:string
  
  @Column({ nullable: true })
  persistent_tipoRede:string
  
  @Column({ nullable: true })
  persistent_agrupamentoHuaweiRf:string
  
  @Column({ nullable: true })
  persistent_CARDINAL_SYNC:boolean
  
  @Column({ nullable: true })
  persistent_frontNetworkType:string
  
  @Column({ nullable: true })
  persistent_siglaErb:string
  
  @Column({ nullable: true })
  persistent_frontTypeTa:string
  
  @Column({ nullable: true })
  persistent_frontSpecificProblem:string
  
  @Column({ nullable: true })
  persistent_frontNodeReference:string
  
  @Column({ nullable: true })
  persistent_vip:string
  
  @Column({ nullable: true })
  persistent_frontSerialNumber:string
  
  @Column({ nullable: true })
  persistent_longoTTL:string
  
  @Column({ nullable: true })
  persistent_alarmIdPur:string
  
  @Column({ nullable: true })
  persistent_localidadeSigla:string
  
  @Column({ nullable: true })
  persistent_tramitaNoc:string
  
  @Column({ nullable: true })
  persistent_frontDomain:string
  
  @Column({ nullable: true })
  persistent_identifier:string
  
  @Column({ nullable: true })
  persistent_serialNumber:string
  
  @Column({ nullable: true })
  persistent_bairro:string
  
  @Column({ nullable: true })
  persistent_alertNode:string
  
  @Column({ nullable: true })
  persistent_nodePUR:string
  
  @Column({ nullable: true })
  persistent_dataFalha:string
  
  @Column({ nullable: true })
  persistent_frontPersistence:string
  
  @Column({ nullable: true })
  persistent_tipoTa:string
  
  @Column({ nullable: true })
  persistent_tipoTA:string
  
  @Column({ nullable: true })
  persistent_impacto:string
  
  @Column({ nullable: true })
  persistent_tipoAlarme:string
  
  @Column({ nullable: true })
  persistent_tipoDeAlarme:string
  
  @Column({ nullable: true })
  persistent_frontElementType:string
  
  @Column({ nullable: true })
  persistent_driver:string
  
  @Column({ nullable: true })
  persistent_codeBaixa:string
  
  @Column({ nullable: true })
  persistent_setorPUR:string
  
  @Column({ nullable: true })
  persistent_frontPlantType:string
  
  @Column({ nullable: true })
  persistent_frontTypeFailure:string
  
  @Column({ nullable: true })
  persistent___PROXY_SIGITM:string
  
  @Column({ nullable: true })
  persistent_concentrador:string
  
  @Column({ nullable: true })
  persistent_tipoSite:string
  
  @Column({ nullable: true })
  persistent_critical:string
  
  @Column({ nullable: true })
  persistent_frontVendor:string
  
  @Column({ nullable: true })
  persistent_frontScriptProbe:string
  
  @Column({ nullable: true })
  persistent_rule:string
  
  @Column({ nullable: true })
  persistent_medioTTL:string
  
  @Column({ nullable: true })
  persistent_central:string
  
  @Column({ nullable: true })
  persistent_tipoAfetacao:string
  
  @Column({ nullable: true })
  persistent_areaOper:string
  
  @Column({ nullable: true })
  persistent_gerenciaCodigo:string
  
  @Column({ nullable: true })
  persistent_floating:string
  
  @Column({ nullable: true })
  persistent_persistenciaClose:string
  
  @Column({ nullable: true })
  persistent_frontAlarmId:string
  
  @Column({ nullable: true })
  persistent_alarmId:string
  
  @Column({ nullable: true })
  persistent_frontImpactEquipment:string
  
  @Column({ nullable: true })
  persistent_frontProblemCause:string
  
  @Column({ nullable: true })
  persistent_classificacao:string
  
  @Column({ nullable: true })
  persistent_nodeAliasInfraPrioridade:string
  
  @Column({ nullable: true })
  persistent_persistenciaEspecial:string
  
  @Column({ nullable: true })
  persistent_curtoTTL:string
  
  @Column({ nullable: true })
  persistent_key:string
  
  @Column({ nullable: true })
  persistent_frontTramitaNOC:string
  
  @Column({ nullable: true })
  persistent_endereco:string
  
  @Column({ nullable: true })
  persistent_ddd:string
  
  @Column({ nullable: true })
  persistent_idLookupRF:string
  
  @Column({ nullable: true })
  persistent_estadoSigla:string
  
  @Column({ nullable: true })
  persistent_areaNome:string
  
  @Column({ nullable: true })
  persistent_descricaobaixa:string
  
  @Column({ nullable: true })
  persistent_frontPodName:string
  
  @Column({ nullable: true })
  persistent_ta:number
  
  @Column({ nullable: true })
  persistent_tempoAbertura:string
  
  @Column({ nullable: true })
  persistent_tipoTecnologia:string
  
  @Column({ nullable: true })
  persistent_specificProblem:string
  
  @Column({ nullable: true })
  persistent_alarmeCriticidade:string
  
  @Column({ nullable: true })
  persistent_ti:number
  
  @Column({ nullable: true })
  persistent_alarmeImpacto:string
  
  @Column({ nullable: true })
  persistent_tipoPlanta:string
  
  @Column({ nullable: true })
  persistent_medioTally:string
  
  @Column({ nullable: true })
  persistent_longoTally:string
  
  @Column({ nullable: true })
  persistent_persistencia:string
  
  @Column({ nullable: true })
  persistent_estadoNome:string
  
  @Column({ nullable: true })
  persistent_familia:string
  
  @Column({ nullable: true })
  persistent_tipoFalha:string

  @Column({ nullable: true })
  persistent_ttl:string
  
  @Column({ nullable: true })
  identifier:string
  
  @Column({ nullable: true })
  enterprise:string
  
  @Column({ nullable: true })
  specificTrap:string
  
  @Column({ nullable: true })
  genericTrap:string
  
  @Column({ nullable: true })
  notify:string
  
  @Column({ nullable: true })
  alertGroup:string
  
  @Column({ nullable: true })
  description:string
  
  @Column({ nullable: true })
  summary:string
  
  @Column({ nullable: true })
  nodeAlias:string
  
  @Column({ nullable: true })
  ngem:string
  
  @Column({ nullable: true })
  type:string
  
  @Column({ nullable: true })
  severity:number
  
  @Column({ nullable: true })
  workgroup:number
  
  @Column({ nullable: true })
  matchedCounter:number
  
  @Column({ nullable: true })
  send:string
  
  @Column({ nullable: true })
  agent:string
  
  @Column({ nullable: true })
  node:string
  
  @Column({ nullable: true })
  alertKey:string
  
  @Column({ nullable: true })
  cityId:string
  
  @Column({ nullable: true })
  manager:string
  
  @Column({ nullable: true })
  netcoolClass:string
  
  @Column({ nullable: true })
  technology:string
  
  @Column({ nullable: true })
  expireTime:number
  
  @Column({ nullable: true })
  url:string
  
  @Column({ nullable: true })
  cacheManager:string
  
  @Column({ nullable: true })
  sendClearOnExpiration:boolean
  
  @Column({ nullable: true })
  lastSeen:string
  
  @Column({ nullable: true })
  firtsSeen:string
  
  @Column({ nullable: true })
  firstSeen:string
  
  @CreateDateColumn()
  alarmInURA:Date
  
  @Column({ nullable: true })
  idRulePolicy:number
  
  @Column({ nullable: true })
  acknowledged:boolean
  
  @Column({ nullable: true })
  internalId:number
  
  @Column({ nullable: true })
  internalLast:string
  
  @Column({ nullable: true })
  lastUpdate:string
  
  @Column({ nullable: true })
  ownerUid:number
  
  @Column({ nullable: true })
  groupUid:number
  
  @Column({ nullable: true })
  uuid:string
  
  @Column({ default: false})
  vocalizado:boolean

  @OneToMany(() => VocalizacaoHistoryTems, (alarme)=> alarme.alarme)
  vocsHist: VocalizacaoHistoryTems[];
}
