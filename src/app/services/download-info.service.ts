import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { FarmsService } from '../services/farms.service';
import { InitializeService } from '../services/initialize.service';
import { Country } from '../models/country';
import { Ownership } from '../models/ownership';
import { Supplier } from '../models/supplier';
import { Department } from '../models/department';
import { Municipality } from '../models/municipality';
import { Village } from '../models/village';
import { FarmStatus } from '../models/farmStatus';
import { Cooperative } from '../models/cooperative';
import { ContactType, ContactLocation, ContactTopic, ContactName, Contact} from '../models/contact';
import { Plantation, PlantationStatus, PlantationType, PlantationVariety } from '../models/plantation';
import { FloweringPeriod, FloweringPeriodsQualification } from '../models/floweringPeriods';
import { Project, ProjectType } from '../models/project';
import { SupplyChain } from '../models/supplyChain';
import { ConfigurationInfo } from '../models/configurationInfo';
import { InformacionInicial } from '../models/informacionInicial';
import { AssignedFarm } from '../models/assignedFarm';
import { Farm } from '../models/farm';
import { GeoLocation } from '../models/geolocation';
import { FarmSupplyChain } from '../models/farmSupplyChain';
import { Worker } from '../models/worker';
import { FamilyMember } from '../models/familyMember';
import { AssociatedPeople } from '../models/associatedPeople';
import { Productivity } from '../models/productivity';
import { Fertilizer, GroupedFertilizer } from '../models/fertilizer';
import { GroupedInvoice, Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class DownloadInfoService {

  constructor(
    public _farmsService: FarmsService,
    public _initializeService: InitializeService,
    private databaseService: DatabaseService,
  ) { }


    //-------------------------- Download functions -----------------------------


    downloadCountries(countriesRes:any){
      if(countriesRes.length > 0) {
        for (let i = 0; i < countriesRes.length; i++) {
          let country = new Country(countriesRes[i].id,countriesRes[i].name);
          this.databaseService.syncCountries(country);
        }
      }
    }
  
    downloadSuppliers(suppliersRes:any){
      if(suppliersRes.length > 0) {
        for (let i = 0; i < suppliersRes.length; i++) {
          let supplier = new Supplier(suppliersRes[i].id,suppliersRes[i].name,suppliersRes[i].countryId);
          this.databaseService.syncSuppliers(supplier);
        }
      }
    }
  
    downloadDepMunVill(departmentsRes:any){
      let department = new Department('','');
      let municipality = new Municipality('','','');
      let village = new Village('','','');
      if(departmentsRes.length > 0) {
        for (let i = 0; i < departmentsRes.length; i++) {
          department.id = departmentsRes[i].id;
          department.name = departmentsRes[i].name;
          this.databaseService.syncDepartments(department);
          delete department.id;
          delete department.name;
          for (let j = 0; j < departmentsRes[i].municipalities.length; j++) {
            municipality.id = departmentsRes[i].municipalities[j].id;
            municipality.name = departmentsRes[i].municipalities[j].name;
            municipality.departmentId = departmentsRes[i].municipalities[j].departmentId;
            this.databaseService.syncMunicipalities(municipality);
            delete municipality.id;
            delete municipality.name;
            delete municipality.departmentId;          
            for (let k = 0; k < departmentsRes[i].municipalities[j].villages.length; k++) {
              village.id = departmentsRes[i].municipalities[j].villages[k].id;
              village.name = departmentsRes[i].municipalities[j].villages[k].name;
              village.municipalityId = departmentsRes[i].municipalities[j].villages[k].municipalityId;
              this.databaseService.syncVillages(village);
              delete village.id;
              delete village.name;
              delete village.municipalityId;
            }
          }
        }
      }
      
    }
  
    downloadFarmStatus(farmStatusRes:any){
      if(farmStatusRes.length > 0) {
        for (let i = 0; i < farmStatusRes.length; i++) {
          let farmStatus = new FarmStatus(farmStatusRes[i].id,farmStatusRes[i].name);
          this.databaseService.syncFarmStatus(farmStatus);
        }
      }
    }
  
    downloadCooperatives(cooperativesRes:any){
      if(cooperativesRes.length > 0) {
        for (let i = 0; i < cooperativesRes.length; i++) {
          let cooperative = new Cooperative(cooperativesRes[i].id,cooperativesRes[i].name);
          this.databaseService.syncCooperatives(cooperative);
        }
      }
    }
  
    downloadOwnership(ownershipRes:any){
      if(ownershipRes.length > 0) {
        for (let i = 0; i < ownershipRes.length; i++) {
          let ownership = new Ownership(ownershipRes[i].id,ownershipRes[i].name);
          this.databaseService.syncOwnership(ownership);
        }
      }
    }
  
    downloadContactType(contactTypeRes:any){
      if(contactTypeRes.length > 0) {
        for (let i = 0; i < contactTypeRes.length; i++) {
          let contactType = new ContactType(contactTypeRes[i].id,contactTypeRes[i].name);
          this.databaseService.syncContactType(contactType);
        }
      }
    }
  
    downloadContactLocation(contactLocationRes:any){
      if(contactLocationRes.length > 0) {
        for (let i = 0; i < contactLocationRes.length; i++) {
          let contactLocation = new ContactLocation(contactLocationRes[i].id,contactLocationRes[i].name);
          this.databaseService.syncContactLocation(contactLocation);
        }
      }
    }
  
    downloadContactTopic(contactTopicRes:any){
      if(contactTopicRes.length > 0) {
        for (let i = 0; i < contactTopicRes.length; i++) {
          let contactTopic = new ContactTopic(contactTopicRes[i].id,contactTopicRes[i].name);
          this.databaseService.syncContactTopic(contactTopic);
        }
      }
    }
  
    downloadContactName(contactNamesRes:any){
      if(contactNamesRes.length > 0) {
        for (let i = 0; i < contactNamesRes.length; i++) {
          let contactName = new ContactName(contactNamesRes[i].value);
          this.databaseService.syncContactNames(contactName);
        }
      }
    }
  
    downloadPlantationTypes(plantationTypesRes:any){
      if(plantationTypesRes.length > 0) {
        for (let i = 0; i < plantationTypesRes.length; i++) {
          let plantationType = new PlantationType(plantationTypesRes[i].id,plantationTypesRes[i].name);
          this.databaseService.syncPlantationTypes(plantationType);
        }
      }
    }
  
    downloadPlantationStatus(plantationStatusRes:any){
      if(plantationStatusRes.length > 0) {
        for (let i = 0; i < plantationStatusRes.length; i++) {
          let plantationStatus = new PlantationStatus(plantationStatusRes[i].id,plantationStatusRes[i].name);
          this.databaseService.syncPlantationStatus(plantationStatus);
        }
      }
    }
  
    downloadPlantationVarieties(plantationStatusRes:any){
      if(plantationStatusRes.length > 0) {
        for (let i = 0; i < plantationStatusRes.length; i++) {
          let plantationVariety = new PlantationVariety(plantationStatusRes[i].id,plantationStatusRes[i].name,plantationStatusRes[i].plantationTypeId);
          this.databaseService.syncPlantationVarieties(plantationVariety);
        }
      }
    }
  
    downloadFloweringPeriodsQualifications(floweringPeriodsRes:any){
      if(floweringPeriodsRes.length > 0) {
        for (let i = 0; i < floweringPeriodsRes.length; i++) {
          let floweringPeriodsQua = new FloweringPeriodsQualification(floweringPeriodsRes[i].id,floweringPeriodsRes[i].name);
          this.databaseService.syncFloweringPeriodsQualifications(floweringPeriodsQua);
        }
      }
    }
  
    downloadProjectTypes(projectsRes:any){
      if(projectsRes.length > 0) {
        for (let i = 0; i < projectsRes.length; i++) {
          let projectType = new ProjectType(projectsRes[i].id,projectsRes[i].name,projectsRes[i].description);
          this.databaseService.syncProjectTypes(projectType);
        }
      }
    }
  
    downloadSupplyChain(supplyChainRes:any){
      if(supplyChainRes.length > 0) {
        for (let i = 0; i < supplyChainRes.length; i++) {
          let supplyChain = new SupplyChain(supplyChainRes[i].id_supplyChains,supplyChainRes[i].nombre_Junto,supplyChainRes[i].name_suppliers,supplyChainRes[i].name_supplyChains);
          this.databaseService.syncSupplyChain(supplyChain);
        }
      }
    }
  
    downloadConfigurationInfo(userRolesRes:any,assTargetsRes:any,educationRes:any,relationshipRes:any,marStatusRes:any,classLaborRes:any,classTLotRes: any,classFSiemRes: any,classNEALRes: any){
  
      let configurationInfoUser = new ConfigurationInfo('userRoles',userRolesRes[0]);
      this.databaseService.syncConfigurationInfo(configurationInfoUser);
  
      if(assTargetsRes.length > 0) {
        let assTar = assTargetsRes[0];
        for (let i = 1; i < assTargetsRes.length; i++) {
          assTar += "," + assTargetsRes[i];
        }
        let configurationInfoAT = new ConfigurationInfo('assessmentTargets',assTar);
        this.databaseService.syncConfigurationInfo(configurationInfoAT);
      }
  
      if(educationRes.length > 0) {
        let edu = educationRes[0];
        for (let i = 1; i < educationRes.length; i++) {
          edu += "," + educationRes[i];
        }
        let configurationInfoEdu = new ConfigurationInfo('education',edu);
        this.databaseService.syncConfigurationInfo(configurationInfoEdu);
      }
  
      if(relationshipRes.length > 0) {
        let rela = relationshipRes[0];
        for (let i = 1; i < relationshipRes.length; i++) {
          rela += "," + relationshipRes[i];
        }
        let configurationInfoRel = new ConfigurationInfo('relationship',rela);
        this.databaseService.syncConfigurationInfo(configurationInfoRel);
      }
  
      if(marStatusRes.length > 0) {
        let mari = marStatusRes[0];
        for (let i = 1; i < marStatusRes.length; i++) {
          mari += "," + marStatusRes[i];
        }
        let configurationInfoMar = new ConfigurationInfo('maritalStatus',mari);
        this.databaseService.syncConfigurationInfo(configurationInfoMar);
      }
  
      if(classLaborRes.length > 0) {
        let cLabor =  classLaborRes[0].name;
        for (let i = 1; i < classLaborRes.length; i++) {
          cLabor += "," + classLaborRes[i].name;
        }
        let configurationInfoCL = new ConfigurationInfo('classLabor',cLabor);
        this.databaseService.syncConfigurationInfo(configurationInfoCL);
      }
  
      if(classTLotRes.length > 0) {
        let cTLot = classTLotRes[0].name;
        for (let i = 1; i < classTLotRes.length; i++) {
          cTLot += "," + classTLotRes[i].name;
        }
        let configurationInfoTL = new ConfigurationInfo('classTLot',cTLot);
        this.databaseService.syncConfigurationInfo(configurationInfoTL);
      }
  
      if(classFSiemRes.length > 0) {
        let cFSiem = classFSiemRes[0].name
        for (let i = 1; i < classFSiemRes.length; i++) {
          cFSiem += "," + classFSiemRes[i].name;
        }
        let configurationInfoFS = new ConfigurationInfo('classFSiem',cFSiem);
        this.databaseService.syncConfigurationInfo(configurationInfoFS);
      }
  
      if(classNEALRes.length > 0) {
        let cNEAL = classNEALRes[0].name;
        for (let i = 1; i < classNEALRes.length; i++) {
          cNEAL += "," + classNEALRes[i].name;
        }
        let configurationInfoNEAL = new ConfigurationInfo('classNumEjeArbLot',cNEAL);
        this.databaseService.syncConfigurationInfo(configurationInfoNEAL);
      }
  
    }

    downloadAllInitialInfo (response){
      const downloadAll = new Promise ((resolve,reject) => {
        try {
          this.downloadCountries(response.countries);
          this.downloadSuppliers(response.suppliers);
          this.downloadFarmStatus(response.status);
          this.downloadCooperatives(response.cooperatives);
          this.downloadOwnership(response.ownership_types);
          this.downloadContactType(response.contact_type);
          this.downloadContactLocation(response.contact_location);
          this.downloadContactTopic(response.contact_topic);
          this.downloadContactName(response.contact_names);
          this.downloadPlantationTypes(response.plantation_types);
          this.downloadPlantationStatus(response.plantation_status);
          this.downloadPlantationVarieties(response.plantation_varieties);
          this.downloadFloweringPeriodsQualifications(response.flowering_periods);
          this.downloadProjectTypes(response.projects);
          this.downloadSupplyChain(response.supplyChain);
          this.downloadConfigurationInfo(response.userRoles,response.assessment_targets,response.education,response.relationship,response.marital_status,response.classLabor,response.classTLot,response.classFSiem,response.classNumEjeArbLot);
          this.downloadDepMunVill(response.departments);
          resolve(true)
        } catch (error) {
          reject(error)
        }
      });
      return downloadAll
    }
  
  
    // +++++++++++++++++++ download Farms functions ++++++++++++++++++++++++
  
    downloadAssignedFarms(assignedFarmsRes:any){
      if(assignedFarmsRes.length > 0) {
        for (let i = 0; i < assignedFarmsRes.length; i++) {
          let assignedFarm = new AssignedFarm(assignedFarmsRes[i].id,assignedFarmsRes[i].code,assignedFarmsRes[i].name,assignedFarmsRes[i].farmer,assignedFarmsRes[i].departmentId,assignedFarmsRes[i].municipalityId,assignedFarmsRes[i].villageId,false);
          this.databaseService.syncAssignedFarms(assignedFarm);
        }
      }
    }

    downloadFarm(FarmRes:any){
      let farm = new Farm(
        FarmRes.id,
        FarmRes.code,
        FarmRes.name,
        FarmRes.currentTechnician,
        FarmRes.longitude,
        FarmRes.latitude,
        FarmRes.elevation,
        FarmRes.densityIndicator,
        FarmRes.plants,
        FarmRes.hectares,
        FarmRes.fertilizerIndicator,
        FarmRes.productivePlants,
        FarmRes.fertilizerBags,
        FarmRes.productivityIndicator,
        FarmRes.estimatedProduction,
        FarmRes.ageIndicator,
        FarmRes.supplyChainId,
        FarmRes.villageId,
        FarmRes.village.municipalityId,
        FarmRes.village.municipality.departmentId,
        FarmRes.farmStatusId,
        FarmRes.cooperativeId,
        FarmRes.ownershipTypeId
      );
      this.databaseService.syncFarms(farm);
      let geolocation = new GeoLocation(
        0,
        FarmRes.geoLocation.geography.coordinateSystemId,
        FarmRes.geoLocation.geography.wellKnowText,
        FarmRes.id
      );
      this.databaseService.syncGeoLocation(geolocation);
      let farmSupplyChain = new FarmSupplyChain(
        FarmRes.supplyChain.id,
        FarmRes.supplyChain.startDate,
        FarmRes.supplyChain.endDate,
        FarmRes.supplyChain.potencial,
        FarmRes.supplyChain.bags,
        FarmRes.supplyChain.code,
        FarmRes.supplyChain.address,
        FarmRes.supplyChain.supplierId,
        FarmRes.supplyChain.qualityProfileId,
        FarmRes.supplyChainStatusId,
        FarmRes.supplyChain.departmentId,
        FarmRes.Id
      );
      this.databaseService.syncFarmsSupplyChain(farmSupplyChain);
      let worker = new Worker(
        FarmRes.worker.id,
        FarmRes.worker.permanentWomen,
        FarmRes.worker.permanentMen,
        FarmRes.worker.temporaryWomen,
        FarmRes.worker.temporaryMen,
        FarmRes.Id
      );
      this.databaseService.syncWorkers(worker);
      
      if(FarmRes.familyUnitMembers.length > 0){
        for (let i = 0; i < FarmRes.familyUnitMembers.length; i++) {
          let familyMember = new FamilyMember(
            FarmRes.familyUnitMembers[i].id,
            FarmRes.familyUnitMembers[i].firstName,
            FarmRes.familyUnitMembers[i].lastName,
            FarmRes.familyUnitMembers[i].fullName,
            FarmRes.familyUnitMembers[i].age,
            FarmRes.familyUnitMembers[i].identification,
            FarmRes.familyUnitMembers[i].education,
            FarmRes.familyUnitMembers[i].phoneNumber,
            FarmRes.familyUnitMembers[i].relationship,
            FarmRes.familyUnitMembers[i].maritalStatus,
            FarmRes.familyUnitMembers[i].isOwner,
            FarmRes.familyUnitMembers[i].farmId
          );
          this.databaseService.syncFamilyUnitMembers(familyMember);
        }
      }

      if(FarmRes.associatedPeople.length > 0){
        for (let i = 0; i < FarmRes.associatedPeople.length; i++) {
          let associatedPeople = new AssociatedPeople(
            FarmRes.associatedPeople[i].id,
            FarmRes.associatedPeople[i].username,
            FarmRes.associatedPeople[i].email,
            FarmRes.associatedPeople[i].password,
            FarmRes.associatedPeople[i].salt,
            FarmRes.associatedPeople[i].firstName,
            FarmRes.associatedPeople[i].lastName,
            FarmRes.associatedPeople[i].fullName,
            FarmRes.associatedPeople[i].isActive,
            FarmRes.associatedPeople[i].sensoryProfileAssessments,
            FarmRes.associatedPeople[i].roles[0].roleName,
            FarmRes.id
          );
          this.databaseService.syncAssociatedPeople(associatedPeople);
        }
      }

      let productivity = new Productivity(
        FarmRes.productivity.id,
        FarmRes.productivity.totalHectares,
        FarmRes.productivity.infrastructureHectares,
        FarmRes.productivity.forestProtectedHectares,
        FarmRes.productivity.conservationHectares,
        FarmRes.productivity.shadingPercentage,
        FarmRes.productivity.averageAge,
        FarmRes.productivity.averageDensity,
        FarmRes.productivity.percentageColombia,
        FarmRes.productivity.percentageCaturra,
        FarmRes.productivity.percentageCastillo,
        FarmRes.productivity.percentageotra,
        FarmRes.productivity.coffeeArea,
        FarmRes.productivity.productionPlants,
        FarmRes.productivity.productionPercentage,
        FarmRes.productivity.productionAreaPercentage,
        FarmRes.productivity.productionArea,
        FarmRes.productivity.growingPlants,
        FarmRes.productivity.growingPercentage,
        FarmRes.productivity.growingAreaPercentage,
        FarmRes.productivity.growingArea,
        FarmRes.productivity.estimatedProduction,
        FarmRes.productivity.farmId
      );
      this.databaseService.syncProductivity(productivity);

      if(FarmRes.productivity.plantations.length > 0){
        for (let i = 0; i < FarmRes.productivity.plantations.length; i++) {
          let plantation = new Plantation(
            FarmRes.productivity.plantations[i].id,
            FarmRes.productivity.plantations[i].hectares,
            FarmRes.productivity.plantations[i].treesDistance,
            FarmRes.productivity.plantations[i].grooveDistance,
            FarmRes.productivity.plantations[i].density,
            FarmRes.productivity.plantations[i].estimatedProduction,
            FarmRes.productivity.plantations[i].age,
            FarmRes.productivity.plantations[i].numberOfPlants,
            FarmRes.productivity.plantations[i].numberLot,
            FarmRes.productivity.plantations[i].nomLot,
            FarmRes.productivity.plantations[i].labLot,
            FarmRes.productivity.plantations[i].tipoLot,
            FarmRes.productivity.plantations[i].formLot,
            FarmRes.productivity.plantations[i].numEjeArbLot,
            FarmRes.productivity.plantations[i].municipalityId,
            FarmRes.productivity.plantations[i].villageId,
            FarmRes.productivity.plantations[i].productivityId,
            FarmRes.productivity.plantations[i].plantationStatusId,
            FarmRes.productivity.plantations[i].plantationTypeId,
            FarmRes.productivity.plantations[i].plantationVarietyId
          );
          this.databaseService.syncPlantations(plantation);
          if(FarmRes.productivity.plantations[i].floweringPeriods.length > 0){
            for (let j = 0; j < FarmRes.productivity.plantations[i].floweringPeriods.length; j++) {
              let floweringPeriod = new FloweringPeriod(
                FarmRes.productivity.plantations[i].floweringPeriods[j].id,
                FarmRes.productivity.plantations[i].floweringPeriods[j].startDate,
                FarmRes.productivity.plantations[i].floweringPeriods[j].startDateFormated,
                FarmRes.productivity.plantations[i].floweringPeriods[j].floweringPeriodQualificationId,
                FarmRes.productivity.plantations[i].floweringPeriods[j].plantationId
              )
              this.databaseService.syncFloweringPeriods(floweringPeriod);
            }
          }
        }
      }

      if(FarmRes.fertilizers.length > 0){
        for (let i = 0; i < FarmRes.fertilizers.length; i++) {
          let fertilizer = new Fertilizer(
            FarmRes.fertilizers[i].id,
            FarmRes.fertilizers[i].invoiceNumber,
            FarmRes.fertilizers[i].farmerIdentification,
            FarmRes.fertilizers[i].ubication,
            FarmRes.fertilizers[i].date,
            FarmRes.fertilizers[i].value,
            FarmRes.fertilizers[i].hold,
            FarmRes.fertilizers[i].cashRegister,
            FarmRes.fertilizers[i].unitPrice,
            FarmRes.fertilizers[i].quantity,
            FarmRes.fertilizers[i].name,
            FarmRes.fertilizers[i].formatedDate,
            FarmRes.fertilizers[i].inputDateFormated,
            FarmRes.fertilizers[i].farmId
          );
          this.databaseService.syncFertilizers(fertilizer);
        }
      }

      if(FarmRes.invoices.length > 0){
        for (let i = 0; i < FarmRes.invoices.length; i++) {
          let invoice = new Invoice(
            FarmRes.invoices[i].id,
            FarmRes.invoices[i].invoiceNumber,
            FarmRes.invoices[i].identification,
            FarmRes.invoices[i].value,
            FarmRes.invoices[i].dateInvoice,
            FarmRes.invoices[i].ubication,
            FarmRes.invoices[i].hold,
            FarmRes.invoices[i].cash,
            FarmRes.invoices[i].weight,
            FarmRes.invoices[i].baseKg,
            FarmRes.invoices[i].coffeeTypeId,
            FarmRes.invoices[i].date,
            FarmRes.invoices[i].formatedDate,
            FarmRes.invoices[i].inputDateFormated,
            FarmRes.invoices[i].farmId
          );
          this.databaseService.syncInvoices(invoice);
        }
      }

      if(FarmRes.groupedFertilizers2.length > 0){
        for (let i = 0; i < FarmRes.groupedFertilizers2.length; i++) {
          let groupedFertilizer =  new GroupedFertilizer(
            FarmRes.groupedFertilizers2[i].year,
            FarmRes.groupedFertilizers2[i].quantity,
            FarmRes.groupedFertilizers2[i].totalValue,
            FarmRes.groupedFertilizers2[i].averagePrice,
            FarmRes.id
          );
          this.databaseService.syncGroupedFertilizers(groupedFertilizer);
        }
      }

      if(FarmRes.groupedInvoices2.length > 0){
        for (let i = 0; i < FarmRes.groupedInvoices2.length; i++) {
          let groupedInvoice =  new GroupedInvoice(
            FarmRes.groupedInvoices2[i].year,
            FarmRes.groupedInvoices2[i].totalKg,
            FarmRes.groupedInvoices2[i].totalValue,
            FarmRes.groupedInvoices2[i].averageValue,
            FarmRes.id
          );
          this.databaseService.syncGroupedInvoices(groupedInvoice);
        }
      }

      if(FarmRes.projects.length > 0){
        for (let i = 0; i < FarmRes.projects.length; i++) {
          let project =  new Project(
            FarmRes.projects[i].id,
            FarmRes.id
          );
          this.databaseService.syncProjects(project);
        }
      }

      if(FarmRes.contacts.length > 0){
        for (let i = 0; i < FarmRes.contacts.length; i++) {
          let topics = '';
          if (FarmRes.contacts[i].topics.length > 0) {
            for (let j = 0; j < FarmRes.contacts[i].topics.length; j++) {
              topics += FarmRes.contacts[i].topics[j].name 
            }
          }
          let contact =  new Contact(
            FarmRes.contacts[i].id,
            FarmRes.contacts[i].name,
            FarmRes.contacts[i].date,
            FarmRes.contacts[i].comment,
            FarmRes.contacts[i].actionType,
            topics,
            FarmRes.contacts[i].userId,
            FarmRes.contacts[i].typeId,
            FarmRes.contacts[i].locationId,
            FarmRes.id
          );
          this.databaseService.syncContacts(contact);
        }
      }

    }

    async downloadAllFarms(selectedFarms: AssignedFarm[]){

      const downloadAll = new Promise ((resolve, reject) => {
        try {
          for (let i = 0; i < selectedFarms.length; i++) {
            this._farmsService.syncId(selectedFarms[i].id).subscribe(
              response => {
                this.downloadFarm(response);
                console.log("Finca "+i+" descargada");
                console.log(response);
              },
              error => {
                console.log("Error en el servicio sync farmId");
                console.log(error);
              }
            );
          }
          resolve(true)
        } catch (error) {
          reject(error)
          console.error(error)
        }
      });
      return await downloadAll
    }



}
