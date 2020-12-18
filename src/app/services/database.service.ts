import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from '../models/country';
import { Ownership} from '../models/ownership';
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
import { Invoice, GroupedInvoice } from '../models/invoice';
import { promise } from 'protractor';
import { PlantationNames, PlantationIds } from '../models/plantations.interface';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  public dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  farms: BehaviorSubject<Farm []> = new BehaviorSubject([]);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient
    ) {
      this.plt.ready().then(() =>{
        this.sqlite.create({
          name: 'app_prueba.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
      });
    }

    seedDatabase() {
      this.http.get('assets/database/app.sql', {responseType: 'text'})
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          console.log("app.sql imported");
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
      });
    }

    dbFullInitialInfo(){
      const loadDb = new Promise((resolve,reject) =>{
        try {
          
        } catch (error) {
          
        }
      })
      return loadDb
    }

    getFarms(): Observable<Farm[]>{
      this.loadFarms();
      return this.farms.asObservable();
    }

    //------------------------------------------------------- Synchronization functions ---------------------------------------------

    syncInformacionInicial(informacionInicial: InformacionInicial){
      this.database.executeSql("INSERT INTO InformacionInicial (Id, Sub, Role, FullName) VALUES (?,?,?,?)",[informacionInicial.id, informacionInicial.sub, informacionInicial.role, informacionInicial.fullname]).then(() => {
        console.log("Inserted InformacionInicial");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncCountries(country: Country){
      this.database.executeSql("INSERT INTO Countries (Id, Name) VALUES (?,?)",[country.id, country.name]).then(() => {
        console.log("Inserted Countries");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncSuppliers(supplier: Supplier){
      this.database.executeSql("INSERT INTO Suppliers (Id, Name, CountryId) VALUES (?,?,?)",[supplier.id, supplier.name, supplier.countryId]).then(() => {
        console.log("Inserted Suppliers");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncDepartments(department: Department){
      this.database.executeSql("INSERT INTO Departments (Id, Name) VALUES (?,?)",[department.id, department.name]).then(() => {
        console.log("Inserted Departments");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncMunicipalities(municipality: Municipality){
      this.database.executeSql("INSERT INTO Municipalities (Id, Name, DepartmentId) VALUES (?,?,?)",[municipality.id, municipality.name, municipality.departmentId]).then(() => {
        console.log("Inserted Municipalities");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncVillages(village: Village){
      this.database.executeSql("INSERT INTO Villages (Id, Name, MunicipalityId) VALUES (?,?,?)",[village.id, village.name, village.municipalityId]).then(() => {
        console.log("Inserted Villages");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncFarmStatus(farmStatus: FarmStatus){
      this.database.executeSql("INSERT INTO FarmStatus (Id, Name) VALUES (?,?)",[farmStatus.id, farmStatus.name]).then(() => {
        console.log("Inserted FarmStatus");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncCooperatives(cooperative: Cooperative){
      this.database.executeSql("INSERT INTO Cooperatives (Id, Name) VALUES (?,?)",[cooperative.id, cooperative.name]).then(() => {
        console.log("Inserted Cooperatives");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncOwnership(ownership: Ownership){
      this.database.executeSql("INSERT INTO OwnershipTypes (Id, Name) VALUES (?,?)",[ownership.id, ownership.name]).then(() => {
        console.log("Inserted OwnershipTypes");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncContactType(contactType: ContactType){
      this.database.executeSql("INSERT INTO ContactType (Id, Name) VALUES (?,?)",[contactType.id, contactType.name]).then(() => {
        console.log("Inserted ContactType");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncContactLocation(contactLocation: ContactLocation){
      this.database.executeSql("INSERT INTO ContactLocation (Id, Name) VALUES (?,?)",[contactLocation.id, contactLocation.name]).then(() => {
        console.log("Inserted ContactLocation");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncContactTopic(contactTopic: ContactTopic){
      this.database.executeSql("INSERT INTO ContactTopic (Id, Name) VALUES (?,?)",[contactTopic.id, contactTopic.name]).then(() => {
        console.log("Inserted ContactTopic");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncContactNames(contactName: ContactName){
      this.database.executeSql("INSERT INTO ContactName (Name) VALUES (?)",[contactName.name]).then(() => {
        console.log("Inserted ContactNames");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncPlantationTypes(plantationType: PlantationType){
      this.database.executeSql("INSERT INTO PlantationTypes (Id, Name) VALUES (?,?)",[plantationType.id, plantationType.name]).then(() => {
        console.log("Inserted PlantationTypes");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncPlantationStatus(plantationStatus: PlantationStatus){
      this.database.executeSql("INSERT INTO PlantationStatus (Id, Name) VALUES (?,?)",[plantationStatus.id, plantationStatus.name]).then(() => {
        console.log("Inserted PlantationStatus");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncPlantationVarieties(plantationVariety: PlantationVariety){
      this.database.executeSql("INSERT INTO PlantationVarieties (Id, Name, PlantationTypeId) VALUES (?,?,?)",[plantationVariety.id, plantationVariety.name,plantationVariety.plantationTypeId]).then(() => {
        console.log("Inserted PlantationVarieties");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncFloweringPeriodsQualifications(floweringPeriodsQua: FloweringPeriodsQualification){
      this.database.executeSql("INSERT INTO FloweringPeriodsQualifications (Id, Name) VALUES (?,?)",[floweringPeriodsQua.id, floweringPeriodsQua.name]).then(() => {
        console.log("Inserted FloweringPeriodsQualifications");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncProjectTypes(projectType: ProjectType){
      this.database.executeSql("INSERT INTO ProjectTypes (Id, Name, Description) VALUES (?,?,?)",[projectType.id, projectType.name, projectType.description]).then(() => {
        console.log("Inserted ProjectTypes");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncSupplyChain(supplyChain: SupplyChain){
      this.database.executeSql("INSERT INTO SupplyChain (Id, NombreJunto, NameSuppliers, NameSupplyChains) VALUES (?,?,?,?)",[supplyChain.id, supplyChain.nombreJunto, supplyChain.nameSuppliers,supplyChain.nameSupplyChains]).then(() => {
        console.log("Inserted SupplyChain");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncConfigurationInfo(configurationInfo: ConfigurationInfo){
      this.database.executeSql("INSERT INTO ConfigurationInfo (Name, Vector) VALUES (?,?)",[configurationInfo.name,configurationInfo.vector]).then(() => {
        console.log("Inserted ConfigurationInfo");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    // +++++++++++++++++++++++++ syncFarms functions ++++++++++++++++++++++++++++

    syncAssignedFarms(assignedFarm: AssignedFarm){
      this.database.executeSql("INSERT INTO AssignedFarms (Id,Code,Name,Farmer,DepartmentId,MunicipalityId,VillageId) VALUES (?,?,?,?,?,?,?)",[assignedFarm.id,assignedFarm.code,assignedFarm.name,assignedFarm.farmer,assignedFarm.departmentId,assignedFarm.municipalityId,assignedFarm.villageId]).then(() => {
        console.log("Inserted AssignedFarms");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncFarms(farm: Farm){
      this.database.executeSql("INSERT INTO Farms (Id,Code,Name,CurrentTechnician,Longitude,Latitude,Elevation,DensityIndicator,Plants,Hectares,FertilizerIndicator,ProductivePlants,FertilizerBags,ProductivityIndicator,EstimatedProduction,AgeIndicator,SupplyChainId,VillageId,MunicipalityId,DepartmentId,FarmStatusId,CooperativeId,OwnershipTypeId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          farm.id,
          farm.code,
          farm.name,
          farm.currentTechnician,
          farm.longitude,
          farm.latitude,
          farm.elevation,
          farm.densityIndicator,
          farm.plants,
          farm.hectares,
          farm.fertilizerIndicator,
          farm.productivePlants,
          farm.fertilizerBags,
          farm.productivityIndicator,
          farm.estimatedProduction,
          farm.ageIndicator,
          farm.supplyChainId,
          farm.villageId,
          farm.municipalityId,
          farm.departmentId,
          farm.farmStatusId,
          farm.cooperativeId,
          farm.ownershipTypeId
        ]
      ).then(() => {
        console.log("Inserted Farms");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncGeoLocation(geoLocation: GeoLocation){
      this.database.executeSql("INSERT INTO GeoLocation (CoordinateSystemId,WellKnowText,FarmId) VALUES (?,?,?)",[geoLocation.coordinateSystemId,geoLocation.wellKnowText,geoLocation.farmId]).then(() => {
        console.log("Inserted GeoLocation");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncFarmsSupplyChain(farmSupplyChain: FarmSupplyChain){
      this.database.executeSql("INSERT INTO FarmsSupplyChain (Id,StartDate,EndDate,Potencial,Bags,Code,Address,SupplierId,QualityProfileId,SupplyChainStatusId,DepartmentId,FarmId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          farmSupplyChain.id,
          farmSupplyChain.startDate,
          farmSupplyChain.endDate,
          farmSupplyChain.potencial,
          farmSupplyChain.bags,
          farmSupplyChain.code,
          farmSupplyChain.address,
          farmSupplyChain.supplierId,
          farmSupplyChain.qualityProfileId,
          farmSupplyChain.supplyChainStatusId,
          farmSupplyChain.departmentId,
          farmSupplyChain.farmId
        ]
      ).then(() => {
        console.log("Inserted FarmsSupplyChain");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncWorkers(worker: Worker){
      this.database.executeSql("INSERT INTO Workers (Id,PermanentWomen,PermanentMen,TemporaryWomen,TemporaryMen,FarmId) VALUES (?,?,?,?,?,?)",[worker.id,worker.permanentWomen,worker.permanentMen,worker.temporaryWomen,worker.temporaryMen,worker.farmId]).then(() => {
        console.log("Inserted Workers");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error en Workers" + err);
      });
    }

    syncFamilyUnitMembers(familyMember: FamilyMember){
      this.database.executeSql("INSERT INTO FamilyUnitMembers (Id,FirstName,LastName,FullName,Age,Identification,Education,PhoneNumber,Relationship,MaritalStatus,IsOwner,FarmId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          familyMember.id,
          familyMember.firstName,
          familyMember.lastName,
          familyMember.fullName,
          familyMember.age,
          familyMember.identification,
          familyMember.education,
          familyMember.phoneNumber,
          familyMember.relationship,
          familyMember.maritalStatus,
          familyMember.isOwner,
          familyMember.farmId
        ]
      ).then(() => {
        console.log("Inserted FamilyUnitMembers");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncAssociatedPeople(associatedPeople: AssociatedPeople){
      this.database.executeSql("INSERT INTO AssociatedPeople (Id,UserName,Email,Password,Salt,FirstName,LastName,FullName,IsActive,SensoryProfileAssessments,RoleName,FarmId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          associatedPeople.id,
          associatedPeople.userName,
          associatedPeople.email,
          associatedPeople.password,
          associatedPeople.salt,
          associatedPeople.firstName,
          associatedPeople.lastName,
          associatedPeople.fullName,
          associatedPeople.isActive,
          associatedPeople.sensoryProfileAssessments,
          associatedPeople.roleName,
          associatedPeople.farmId
        ]
      ).then(() => {
        console.log("Inserted AssociatedPeople");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncProductivity(productivity: Productivity){
      this.database.executeSql("INSERT INTO Productivity (Id,TotalHectares,InfrastructureHectares,ForestProtectedHectares,ConservationHectares,ShadingPercentage,AverageAge,AverageDensity,PercentageColombia,PercentageCaturra,PercentageCastillo,PercentageOtra,CoffeeArea,ProductionPlants,ProductionPercentage,ProductionAreaPercentage,ProductionArea,GrowingPlants,GrowingPercentage,GrowingAreaPercentage,GrowingArea,EstimatedProduction,FarmId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          productivity.id,
          productivity.totalHectares,
          productivity.infrastructureHectares,
          productivity.forestProtectedHectares,
          productivity.conservationHectares,
          productivity.shadingPercentage,
          productivity.averageAge,
          productivity.averageDensity,
          productivity.percentageColombia,
          productivity.percentageCaturra,
          productivity.percentageCastillo,
          productivity.percentageOtra,
          productivity.coffeeArea,
          productivity.productionPlants,
          productivity.productionPercentage,
          productivity.productionAreaPercentage,
          productivity.productionArea,
          productivity.growingPlants,
          productivity.growingPercentage,
          productivity.growingAreaPercentage,
          productivity.growingArea,
          productivity.estimatedProduction,
          productivity.farmId
        ]
      ).then(() => {
        console.log("Inserted Productivity");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncPlantations(plantation: Plantation){
      this.database.executeSql("INSERT INTO Plantations (Id,Hectares,TreesDistance,GrooveDistance,Density,EstimatedProduction,Age,NumberOfPlants,NumberLot,NomLot,LabLot,TipoLot,FormLot,NumEjeArbLot,MunicipalityId,VillageId,ProductivityId,PlantationStatusId,PlantationTypeId,PlantationVarietyId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          plantation.id,
          plantation.hectares,
          plantation.treesDistance,
          plantation.grooveDistance,
          plantation.density,
          plantation.estimatedProduction,
          plantation.age,
          plantation.numberOfPlants,
          plantation.numberLot,
          plantation.nomLot,
          plantation.labLot,
          plantation.tipoLot,
          plantation.formLot,
          plantation.numEjeArbLot,
          plantation.municipalityId,
          plantation.villageId,
          plantation.productivityId,
          plantation.plantationStatusId,
          plantation.plantationTypeId,
          plantation.plantationVarietyId
        ]
      ).then(() => {
        console.log("Inserted Plantations");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncFloweringPeriods(floweringPeriod: FloweringPeriod){
      this.database.executeSql("INSERT INTO FloweringPeriods (Id,StartDate,StartDateFormated,FloweringPeriodQualificationId,PlantationId) VALUES (?,?,?,?,?)",
        [
          floweringPeriod.id,
          floweringPeriod.startDate,
          floweringPeriod.startDateFormated,
          floweringPeriod.floweringPeriodQualificationId,
          floweringPeriod.plantationId
        ]
      ).then(() => {
        console.log("Inserted FloweringPeriods");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncFertilizers(fertilizer: Fertilizer){
      this.database.executeSql("INSERT INTO Fertilizers (Id,InvoiceNumber,FarmerIdentification,Ubication,Date,Value,Hold,CashRegister,UnitPrice,Quantity,Name,FormatedDate,InputDateFormated,FarmId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          fertilizer.id,
          fertilizer.invoiceNumber,
          fertilizer.farmerIdentification,
          fertilizer.ubication,
          fertilizer.date,
          fertilizer.value,
          fertilizer.hold,
          fertilizer.cashRegister,
          fertilizer.unitPrice,
          fertilizer.quantity,
          fertilizer.name,
          fertilizer.formatedDate,
          fertilizer.inputDateFormated,
          fertilizer.farmId
        ]
      ).then(() => {
        console.log("Inserted Fertilizers");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncInvoices(invoice: Invoice){
      this.database.executeSql("INSERT INTO Invoices (Id,InvoiceNumber,Identification,Value,DateInvoice,Ubication,Hold,Cash,Weight,BaseKg,CoffeeTypeId,Date,FormatedDate,InputDateFormated,FarmId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          invoice.id,
          invoice.invoiceNumber,
          invoice.identification,
          invoice.value,
          invoice.dateInvoice,
          invoice.ubication,
          invoice.hold,
          invoice.cash,
          invoice.weight,
          invoice.baseKg,
          invoice.coffeeTypeId,
          invoice.date,
          invoice.formatedDate,
          invoice.inputDateformated,
          invoice.farmId
        ]
      ).then(() => {
        console.log("Inserted Invoices");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncGroupedFertilizers(groupedFertilizer: GroupedFertilizer){
      this.database.executeSql("INSERT INTO GroupedFertilizers (Year,Quantity,TotalValue,AveragePrice,FarmId) VALUES (?,?,?,?,?)",
        [
          groupedFertilizer.year,
          groupedFertilizer.quantity,
          groupedFertilizer.totalValue,
          groupedFertilizer.averagePrice,
          groupedFertilizer.farmId
        ]
      ).then(() => {
        console.log("Inserted GroupedFertilizers");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncGroupedInvoices(groupedInvoice: GroupedInvoice){
      this.database.executeSql("INSERT INTO GroupedInvoices (Year,TotalKg,TotalValue,AverageValue,FarmId) VALUES (?,?,?,?,?)",
        [
          groupedInvoice.year,
          groupedInvoice.totalKg,
          groupedInvoice.totalValue,
          groupedInvoice.averageValue,
          groupedInvoice.farmId
        ]
      ).then(() => {
        console.log("Inserted GroupedInvoices");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncProjects(project: Project){
      this.database.executeSql("INSERT INTO Projects (Name,ProjectTypeId,FarmId) VALUES (?,?,?)",[project.name,project.projectTypeId,project.farmId]).then(() => {
        console.log("Inserted Projects");
        //console.log(project)
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }

    syncContacts(contact: Contact){
      this.database.executeSql("INSERT INTO Contacts (Id,Name,Date,Comment,ActionType,Topics,UserId,ContactTypeId,ContactLocation,FarmId) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
          contact.id,
          contact.name,
          contact.date,
          contact.comment,
          contact.actionType,
          contact.topics,
          contact.userId,
          contact.contactTypeId,
          contact.contactLocation,
          contact.farmId
        ]
      ).then(() => {
        console.log("Inserted Contacts");
      }).catch((err) => {
        console.log(err);
        console.log("Insert Error" + err);
      });
    }
  



    //--------------------------------------------------- Load functions ----------------------------------------------------------

    async loadInformacionInicial() {
      let informacionInicial: InformacionInicial[] = [];
      let data = await this.database.executeSql('SELECT * FROM InformacionInicial', [])
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            informacionInicial.push(
              {
                id: data.rows.item(i).Id,
                sub: data.rows.item(i).Sub,
                role: data.rows.item(i).Role,
                fullname: data.rows.item(i).FullName
              }
            );
          }
        }
      return informacionInicial;
    }

    loadInformacionInicial2() {
      const loadII = new Promise<InformacionInicial[]>((resolve, reject) => {
        try {
          let informacionInicial: InformacionInicial[] = [];
          this.database.executeSql('SELECT * FROM InformacionInicial', []).then(data => {
            if(data.rows.length > 0){
              for (let i = 0; i < data.rows.length; i++) {
                informacionInicial.push(
                  {
                    id: data.rows.item(i).Id,
                    sub: data.rows.item(i).Sub,
                    role: data.rows.item(i).Role,
                    fullname: data.rows.item(i).FullName
                  }
                );
              }
            }
          })
          resolve(informacionInicial);
        } catch (error) {
          console.error(error)
          reject(error)
        }
      });
      return loadII;
    }

    
    loadCountries() {
      let countries: Country[] = [];
      this.database.executeSql('SELECT * FROM Countries', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            countries.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name
              }
            );
          }
        }
      })
      return countries;
    }

    loadSuppliers() {
      let suppliers: Supplier[] = [];
      this.database.executeSql('SELECT * FROM Suppliers', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            suppliers.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name,
                countryId: data.rows.item(i).CountryId
              }
            );
          }
        }
      })
      return suppliers;
    }

    loadDepartments() {
      let departments: Department[] = [];
      this.database.executeSql('SELECT * FROM Departments', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            departments.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name
              }
            );
          }
        }
      })
      return departments;
    }

    loadMunicipalities() {
      let municipalities: Municipality[] = [];
      this.database.executeSql('SELECT * FROM Municipalities', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            municipalities.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name,
                departmentId: data.rows.item(i).DepartmentId
              }
            );
          }
        }
      })//Catch
      return municipalities;
    }

    loadVillages() {
      let villages: Village[] = [];
      this.database.executeSql('SELECT * FROM Villages', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            villages.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name,
                municipalityId: data.rows.item(i).MunicipalityId
              }
            );
          }
        }
      })//Catch
      return villages;
    }

    loadFarmStatus() {
      let farmstatus: FarmStatus[] = [];
      this.database.executeSql('SELECT * FROM FarmStatus', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            farmstatus.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name
              }
            );
          }
        }
      })
      return farmstatus;
    }

    loadCooperatives() {
      let cooperatives: Cooperative[] = [];
      this.database.executeSql('SELECT * FROM Cooperatives', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            cooperatives.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name
              }
            );
          }
        }
      })
      return cooperatives;
    }

    loadOwnershipTypes() {
      let ownershipTypes: Ownership[] = [];
      this.database.executeSql('SELECT * FROM OwnershipTypes', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            ownershipTypes.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name
              }
            );
          }
        }
      })
      return ownershipTypes;
    }

    loadContactType() {
      let contactType: ContactType[] = [];
      this.database.executeSql('SELECT * FROM ContactType', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            contactType.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name
              }
            );
          }
        }
      })
      return contactType;
    }

    loadContactLocation() {
      let contactLocation: ContactLocation[] = [];
      this.database.executeSql('SELECT * FROM ContactLocation', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            contactLocation.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name
              }
            );
          }
        }
      })
      return contactLocation;
    }

    loadContactTopic() {
      let contactTopic: ContactTopic[] = [];
      this.database.executeSql('SELECT * FROM ContactTopic', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            contactTopic.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name
              }
            );
          }
        }
      })
      return contactTopic;
    }

    loadContactNames() {
      let contactNames: ContactName[] = [];
      this.database.executeSql('SELECT * FROM ContactName', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            contactNames.push(
              {
                name: data.rows.item(i).Name
              }
            );
          }
        }
      })
      return contactNames;
    }

    loadPlantationTypes() {
      let plantationTypes: PlantationType[] = [];
      this.database.executeSql('SELECT * FROM PlantationTypes', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            plantationTypes.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name
              }
            );
          }
        }
      })
      return plantationTypes;
    }

    loadPlantationStatus() {
      let plantationStatus: PlantationStatus[] = [];
      this.database.executeSql('SELECT * FROM PlantationStatus', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            plantationStatus.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name
              }
            );
          }
        }
      })
      return plantationStatus;
    }

    loadPlantationVarieties() {
      let plantationVarieties: PlantationVariety[] = [];
      this.database.executeSql('SELECT * FROM ContactTopic', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            plantationVarieties.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name,
                plantationTypeId: data.rows.item(i).PlantationTypeId
              }
            );
          }
        }
      })
      return plantationVarieties;
    }

    loadFloweringPeriodsQualifications() {
      let floweringPeriodsQua: FloweringPeriodsQualification[] = [];
      this.database.executeSql('SELECT * FROM FloweringPeriodsQualifications', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            floweringPeriodsQua.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name
              }
            );
          }
        }
      })
      return floweringPeriodsQua;
    }

    loadProjectTypes() {
      let projectTypes: ProjectType[] = [];
      this.database.executeSql('SELECT * FROM ProjectTypes', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            projectTypes.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name,
                description: data.rows.item(i).Description
              }
            );
          }
        }
      })
      return projectTypes;
    }

    loadSupplyChain() {
      let supplyChains: SupplyChain[] = [];
      this.database.executeSql('SELECT * FROM SupplyChain', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            supplyChains.push(
              {
                id: data.rows.item(i).Id,
                nombreJunto: data.rows.item(i).NombreJunto,
                nameSuppliers: data.rows.item(i).NameSuppliers,
                nameSupplyChains: data.rows.item(i).NameSupplyChains
              }
            );
          }
        }
      })
      return supplyChains;
    }

    loadConfigurationInfo() {
      let configurationInfo: ConfigurationInfo[] = [];
      this.database.executeSql('SELECT * FROM ConfigurationInfo', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            configurationInfo.push(
              {
                name: data.rows.item(i).Name,
                vector: data.rows.item(i).Vector
              }
            );
          }
        }
      })
      return configurationInfo;
    }

    // +++++++++++++++++++++++++ loadFarms functions ++++++++++++++++++++++++++++

    loadAssignedFarms2() {

      const loadAF = new Promise<AssignedFarm []>((resolve, reject) => {
        try {
          let assignedFarms: AssignedFarm[] = [];
          this.database.executeSql('SELECT * FROM AssignedFarms', []).then(data => {
            if(data.rows.length > 0){
              for (let i = 0; i < data.rows.length; i++) {
                assignedFarms.push(
                  {
                    id: data.rows.item(i).Id,
                    code: data.rows.item(i).Code,
                    name: data.rows.item(i).Name,
                    farmer: data.rows.item(i).Farmer,
                    departmentId: data.rows.item(i).DepartmentId,
                    municipalityId: data.rows.item(i).MunicipalityId,
                    villageId: data.rows.item(i).VillageId,
                    selected: false
                  }
                );
              }
            }
          })
          resolve(assignedFarms);
        } catch (error) {
          console.error(error)
          reject(error)
        }
      });
      return loadAF;
    }

    async loadAssignedFarms() {
      let assignedFarms: AssignedFarm[] = [];
      let data = await this.database.executeSql('SELECT * FROM AssignedFarms', [])

        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            assignedFarms.push(
              {
                id: data.rows.item(i).Id,
                code: data.rows.item(i).Code,
                name: data.rows.item(i).Name,
                farmer: data.rows.item(i).Farmer,
                departmentId: data.rows.item(i).DepartmentId,
                municipalityId: data.rows.item(i).MunicipalityId,
                villageId: data.rows.item(i).VillageId,
                selected: false
              }
            );
          }
        }
      
      return assignedFarms;
    }

    /*loadAssignedFarms() {
      let assignedFarms: AssignedFarm[] = [];
      this.database.executeSql('SELECT * FROM AssignedFarms', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            assignedFarms.push(
              {
                id: data.rows.item(i).Id,
                code: data.rows.item(i).Code,
                name: data.rows.item(i).Name,
                farmer: data.rows.item(i).Farmer,
                departmentId: data.rows.item(i).DepartmentId,
                municipalityId: data.rows.item(i).MunicipalityId,
                villageId: data.rows.item(i).VillageId,
                selected: false
              }
            );
          }
        }
      })
      return assignedFarms;
    }*/

    async loadFarms2() {
      let farms: Farm[] = [];
      let data = await this.database.executeSql('SELECT * FROM Farms', [])
        
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            farms.push(
              {
                id: data.rows.item(i).Id,
                code: data.rows.item(i).Code,
                name: data.rows.item(i).Name,
                currentTechnician: data.rows.item(i).CurrentTechnician,
                longitude: data.rows.item(i).Longitude,
                latitude: data.rows.item(i).Latitude,
                elevation: data.rows.item(i).Elevation,
                densityIndicator: data.rows.item(i).DensityIndicator,
                plants: data.rows.item(i).Plants,
                hectares: data.rows.item(i).Hectares,
                fertilizerIndicator: data.rows.item(i).FertilizerIndicator,
                productivePlants: data.rows.item(i).ProductivePlants,
                fertilizerBags: data.rows.item(i).FertilizerBags,
                productivityIndicator: data.rows.item(i).ProductivityIndicator,
                estimatedProduction: data.rows.item(i).EstimatedProduction,
                ageIndicator: data.rows.item(i).AgeIndicator,
                supplyChainId: data.rows.item(i).SupplyChainId,
                villageId: data.rows.item(i).VillageId,
                municipalityId: data.rows.item(i).MunicipalityId,
                departmentId: data.rows.item(i).DepartmentId,
                farmStatusId: data.rows.item(i).FarmStatusId,
                cooperativeId: data.rows.item(i).CooperativeId,
                ownershipTypeId: data.rows.item(i).OwnershipTypeId
              }
            );
          }
        }
      return farms;
    }

    loadFarms() {
      
      return this.database.executeSql('SELECT * FROM Farms', []).then(data => {
        let farms: Farm[] = [];
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            farms.push(
              {
                id: data.rows.item(i).Id,
                code: data.rows.item(i).Code,
                name: data.rows.item(i).Name,
                currentTechnician: data.rows.item(i).CurrentTechnician,
                longitude: data.rows.item(i).Longitude,
                latitude: data.rows.item(i).Latitude,
                elevation: data.rows.item(i).Elevation,
                densityIndicator: data.rows.item(i).DensityIndicator,
                plants: data.rows.item(i).Plants,
                hectares: data.rows.item(i).Hectares,
                fertilizerIndicator: data.rows.item(i).FertilizerIndicator,
                productivePlants: data.rows.item(i).ProductivePlants,
                fertilizerBags: data.rows.item(i).FertilizerBags,
                productivityIndicator: data.rows.item(i).ProductivityIndicator,
                estimatedProduction: data.rows.item(i).EstimatedProduction,
                ageIndicator: data.rows.item(i).AgeIndicator,
                supplyChainId: data.rows.item(i).SupplyChainId,
                villageId: data.rows.item(i).VillageId,
                municipalityId: data.rows.item(i).MunicipalityId,
                departmentId: data.rows.item(i).DepartmentId,
                farmStatusId: data.rows.item(i).FarmStatusId,
                cooperativeId: data.rows.item(i).CooperativeId,
                ownershipTypeId: data.rows.item(i).OwnershipTypeId
              }
            );
          }
        }
        this.farms.next(farms);
      });
    }

    loadGeoLocation() {
      let geoLocations: GeoLocation[] = [];
      this.database.executeSql('SELECT * FROM GeoLocation', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            geoLocations.push(
              {
                id: data.rows.item(i).Id,
                coordinateSystemId: data.rows.item(i).CoordinateSystemId,
                wellKnowText: data.rows.item(i).WellKnowText,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      })
      return geoLocations;
    }

    loadFarmsSupplyChain() {
      let farmsSupplyChain: FarmSupplyChain[] = [];
      this.database.executeSql('SELECT * FROM FarmsSupplyChain', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            farmsSupplyChain.push(
              {
                id: data.rows.item(i).Id,
                startDate: data.rows.item(i).StartDate,
                endDate: data.rows.item(i).EndDate,
                potencial: data.rows.item(i).Potencial,
                bags: data.rows.item(i).Bags,
                code: data.rows.item(i).Code,
                address: data.rows.item(i).Address,
                supplierId: data.rows.item(i).SupplierId,
                qualityProfileId: data.rows.item(i).QualityProfileId,
                supplyChainStatusId: data.rows.item(i).SupplyChainStatusId,
                departmentId: data.rows.item(i).DepartmentId,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      })
      return farmsSupplyChain;
    }

    loadWorkers() {
      let workers: Worker[] = [];
      this.database.executeSql('SELECT * FROM Workers', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            workers.push(
              {
                id: data.rows.item(i).Id,
                permanentWomen: data.rows.item(i).PermanentWomen,
                permanentMen: data.rows.item(i).PermanentMen,
                temporaryWomen: data.rows.item(i).TemporaryWomen,
                temporaryMen: data.rows.item(i).TemporaryMen,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      })
      return workers;
    }

    loadFamilyUnitMembers() {
      let familyMembers: FamilyMember[] = [];
      this.database.executeSql('SELECT * FROM FamilyUnitMembers', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            familyMembers.push(
              {
                id: data.rows.item(i).Id,
                firstName: data.rows.item(i).FirstName,
                lastName: data.rows.item(i).LastName,
                fullName: data.rows.item(i).FullName,
                age: data.rows.item(i).Age,
                identification: data.rows.item(i).Identification,
                education: data.rows.item(i).Education,
                phoneNumber: data.rows.item(i).PhoneNumber,
                relationship: data.rows.item(i).Relationship,
                maritalStatus: data.rows.item(i).MaritalStatus,
                isOwner: data.rows.item(i).IsOwner,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      })
      return familyMembers;
    }

    loadAssociatedPeople() {
      let associatedPeople: AssociatedPeople[] = [];
      this.database.executeSql('SELECT * FROM AssociatedPeople', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            associatedPeople.push(
              {
                id: data.rows.item(i).Id,
                userName: data.rows.item(i).UserName,
                email: data.rows.item(i).Email,
                password: data.rows.item(i).Password,
                salt: data.rows.item(i).Salt,
                firstName: data.rows.item(i).FirstName,
                lastName: data.rows.item(i).LastName,
                fullName: data.rows.item(i).FullName,
                isActive: data.rows.item(i).IsActive,
                sensoryProfileAssessments: data.rows.item(i).SensoryProfileAssessments,
                roleName: data.rows.item(i).RoleName,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      })
      return associatedPeople;
    }

    loadProductivity() {
      let productivity: Productivity[] = [];
      this.database.executeSql('SELECT * FROM Productivity', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            productivity.push(
              {
                id: data.rows.item(i).Id,
                totalHectares: data.rows.item(i).TotalHectares,
                infrastructureHectares: data.rows.item(i).InfrastructureHectares,
                forestProtectedHectares: data.rows.item(i).ForestProtectedHectares,
                conservationHectares: data.rows.item(i).ConservationHectares,
                shadingPercentage: data.rows.item(i).ShadingPercentage,
                averageAge: data.rows.item(i).AverageAge,
                averageDensity: data.rows.item(i).AverageDensity,
                percentageColombia: data.rows.item(i).PercentageColombia,
                percentageCaturra: data.rows.item(i).PercentageCaturra,
                percentageCastillo: data.rows.item(i).PercentageCastillo,
                percentageOtra: data.rows.item(i).PercentageOtra,
                coffeeArea: data.rows.item(i).CoffeeArea,
                productionPlants: data.rows.item(i).ProductionPlants,
                productionPercentage: data.rows.item(i).ProductionPercentage,
                productionAreaPercentage: data.rows.item(i).ProductionAreaPercentage,
                productionArea: data.rows.item(i).ProductionArea,
                growingPlants: data.rows.item(i).GrowingPlants,
                growingPercentage: data.rows.item(i).GrowingPercentage,
                growingAreaPercentage: data.rows.item(i).GrowingAreaPercentage,
                growingArea: data.rows.item(i).GrowingArea,
                estimatedProduction: data.rows.item(i).EstimatedProduction,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      })
      return productivity;
    }

    loadPlantations() {
      let plantations: Plantation[] = [];
      this.database.executeSql('SELECT * FROM Plantations', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            plantations.push(
              {
                id: data.rows.item(i).Id,
                hectares: data.rows.item(i).Hectares,
                treesDistance: data.rows.item(i).TreesDistance,
                grooveDistance: data.rows.item(i).GrooveDistance,
                density: data.rows.item(i).Density,
                estimatedProduction: data.rows.item(i).EstimatedProduction,
                age: data.rows.item(i).Age,
                numberOfPlants: data.rows.item(i).NumberOfPlants,
                numberLot: data.rows.item(i).NumberLot,
                nomLot: data.rows.item(i).NomLot,
                labLot: data.rows.item(i).LabLot,
                tipoLot: data.rows.item(i).TipoLot,
                formLot: data.rows.item(i).FormLot,
                numEjeArbLot: data.rows.item(i).NumEjeArbLot,
                municipalityId: data.rows.item(i).MunicipalityId,
                villageId: data.rows.item(i).VillageId,
                productivityId: data.rows.item(i).ProductivityId,
                plantationStatusId: data.rows.item(i).PlantationStatusId,
                plantationTypeId: data.rows.item(i).PlantationTypeId,
                plantationVarietyId: data.rows.item(i).PlantationVarietyId
              }
            );
          }
        }
      })
      return plantations;
    }

    loadFloweringPeriods() {
      let floweringPeriods: FloweringPeriod[] = [];
      this.database.executeSql('SELECT * FROM FloweringPeriods', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            floweringPeriods.push(
              {
                id: data.rows.item(i).Id,
                startDate: data.rows.item(i).StartDate,
                startDateFormated: data.rows.item(i).StartDateFormated,
                floweringPeriodQualificationId: data.rows.item(i).FloweringPeriodQualificationId,
                plantationId: data.rows.item(i).PlantationId
              }
            );
          }
        }
      })
      return floweringPeriods;
    }

    loadFertilizers() {
      let fertilizers: Fertilizer[] = [];
      this.database.executeSql('SELECT * FROM Fertilizers', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            fertilizers.push(
              {
                id: data.rows.item(i).Id,
                invoiceNumber: data.rows.item(i).InvoiceNumber,
                farmerIdentification: data.rows.item(i).FarmerIdentification,
                ubication: data.rows.item(i).Ubication,
                date: data.rows.item(i).Date,
                value: data.rows.item(i).Value,
                hold: data.rows.item(i).Hold,
                cashRegister: data.rows.item(i).CashRegister,
                unitPrice: data.rows.item(i).UnitPrice,
                quantity: data.rows.item(i).Quantity,
                name: data.rows.item(i).Name,
                formatedDate: data.rows.item(i).FormatedDate,
                inputDateFormated: data.rows.item(i).InputDateFormated,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      })
      return fertilizers;
    }

    loadInvoices() {
      let invoices: Invoice[] = [];
      this.database.executeSql('SELECT * FROM Invoices', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            invoices.push(
              {
                id: data.rows.item(i).Id,
                invoiceNumber: data.rows.item(i).InvoiceNumber,
                identification: data.rows.item(i).Identification,
                value: data.rows.item(i).Value,
                dateInvoice: data.rows.item(i).DateInvoice,
                ubication: data.rows.item(i).Ubication,                
                hold: data.rows.item(i).Hold,
                cash: data.rows.item(i).Cash,
                weight: data.rows.item(i).Weight,
                baseKg: data.rows.item(i).BaseKg,
                coffeeTypeId: data.rows.item(i).CoffeeTypeId,
                date: data.rows.item(i).Date,
                formatedDate: data.rows.item(i).FormatedDate,
                inputDateformated: data.rows.item(i).InputDateFormated,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      })
      return invoices;
    }

    loadGroupedFertilizers() {
      let groupedFertilizers: GroupedFertilizer[] = [];
      this.database.executeSql('SELECT * FROM GroupedFertilizers', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            groupedFertilizers.push(
              {
                year: data.rows.item(i).Year,
                quantity: data.rows.item(i).Quantity,
                totalValue: data.rows.item(i).TotalValue,
                averagePrice: data.rows.item(i).AveragePrice,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      })
      return groupedFertilizers;
    }

    loadGroupedInvoices() {
      let groupedInvoices: GroupedInvoice[] = [];
      this.database.executeSql('SELECT * FROM GroupedInvoices', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            groupedInvoices.push(
              {
                year: data.rows.item(i).Year,
                totalKg: data.rows.item(i).TotalKg,
                totalValue: data.rows.item(i).TotalValue,
                averageValue: data.rows.item(i).AverageValue,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      })
      return groupedInvoices;
    }

    loadProjects() {
      let projects: Project[] = [];
      this.database.executeSql('SELECT * FROM Projects', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            projects.push(
              {
                name: data.rows.item(i).Name,
                projectTypeId: data.rows.item(i).ProjectTypeId,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      })
      return projects;
    }

    loadContacts() {
      let contacts: Contact[] = [];
      this.database.executeSql('SELECT * FROM Contacts', []).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            contacts.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name,
                date: data.rows.item(i).Date,
                comment: data.rows.item(i).Comment,
                actionType: data.rows.item(i).ActionType,
                topics: data.rows.item(i).Topics,
                userId: data.rows.item(i).UserId,
                contactTypeId: data.rows.item(i).ContactTypeId,
                contactLocation: data.rows.item(i).ContactLocation,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      })
      return contacts;
    }


    //--------------------------------------------------- search functions ----------------------------------------------------------


    searchAssignedFarms(sql:string) {
      let resultsFarms: AssignedFarm[] = [];
      //let sql = 'SELECT * FROM AssignedFarms WHERE '+key+'='+val;
      this.database.executeSql(sql,[]).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            resultsFarms.push(
              {
                id: data.rows.item(i).Id,
                code: data.rows.item(i).Code,
                name: data.rows.item(i).Name,
                farmer: data.rows.item(i).Farmer,
                departmentId: data.rows.item(i).DepartmentId,
                municipalityId: data.rows.item(i).MunicipalityId,
                villageId: data.rows.item(i).VillageId,
                selected: false
              }
            );
          }
        }
      });
      return resultsFarms;
    }

    searchVillages(municipalityId:string) {
      let resVillages: Village[] = [];
      let sql = 'SELECT * FROM Villages WHERE MunicipalityId="'+municipalityId+'"';
      this.database.executeSql(sql,[]).then(data => {
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            resVillages.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name,
                municipalityId: data.rows.item(i).MunicipalityId
              }
            );
          }
        }
      });
      return resVillages;
    }

    async searchAllPlantations() {
      let plantations: number = 0;
      let data = await this.database.executeSql('SELECT * FROM Plantations', [])
      plantations = data.rows.length
      return plantations
    }

    async searchCoffeePlantations() {
      let plantations: number = 0;
      let data = await this.database.executeSql('SELECT * FROM Plantations WHERE PlantationTypeId="d221bec9-5f73-43a0-9ebf-16417f5674f5"', [])
      plantations = data.rows.length
      return plantations
    }

    async searchTotalHa(){
      let ha = 0;
      let data = await this.database.executeSql('SELECT * FROM Productivity', [])
      if(data.rows.length  > 0){
        for (let i = 0; i < data.rows.length; i++) {
          console.log("TotalHa: " + data.rows.item(i).TotalHectares)
          ha += parseFloat(data.rows.item(i).TotalHectares)
        }
      }
      return ha
    }

    async searchCoffeeHa(){
      let ha = 0;
      let data = await this.database.executeSql('SELECT * FROM Productivity', [])
      if(data.rows.length  > 0){
        for (let i = 0; i < data.rows.length; i++) {
          console.log("CoffeeHa: " + data.rows.item(i).CoffeeArea)
          ha += parseFloat(data.rows.item(i).CoffeeArea)
        }
      }
      return ha
    }

    async searchFarmById(farmId:string){
      let farm: Farm;
      let sql = 'SELECT * FROM Farms WHERE Id="'+ farmId + '"';
      let data = await this.database.executeSql(sql, [])
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            farm = new Farm(
                data.rows.item(i).Id,
                data.rows.item(i).Code,
                data.rows.item(i).Name,
                data.rows.item(i).CurrentTechnician,
                data.rows.item(i).Longitude,
                data.rows.item(i).Latitude,
                data.rows.item(i).Elevation,
                data.rows.item(i).DensityIndicator,
                data.rows.item(i).Plants,
                data.rows.item(i).Hectares,
                data.rows.item(i).FertilizerIndicator,
                data.rows.item(i).ProductivePlants,
                data.rows.item(i).FertilizerBags,
                data.rows.item(i).ProductivityIndicator,
                data.rows.item(i).EstimatedProduction,
                data.rows.item(i).AgeIndicator,
                data.rows.item(i).SupplyChainId,
                data.rows.item(i).VillageId,
                data.rows.item(i).MunicipalityId,
                data.rows.item(i).DepartmentId,
                data.rows.item(i).FarmStatusId,
                data.rows.item(i).CooperativeId,
                data.rows.item(i).OwnershipTypeId 
            );
          }
        }
      return farm;
    }

    async searchGroupedFertilizers(farmId:string) {
      let groupedFertilizers: GroupedFertilizer;
      let sql = 'SELECT * FROM GroupedFertilizers WHERE FarmId="'+ farmId + '"';
      let data = await this.database.executeSql(sql, [])
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            groupedFertilizers = new GroupedFertilizer(
                data.rows.item(i).Year,
                data.rows.item(i).Quantity,
                data.rows.item(i).TotalValue,
                data.rows.item(i).AveragePrice,
                data.rows.item(i).FarmId
            );
          }
        }
      return groupedFertilizers;
    }

    async searchGroupedInvoices(farmId:string) {
      let groupedInvoices: GroupedInvoice;
      let sql = 'SELECT * FROM GroupedInvoices WHERE FarmId="'+ farmId + '"';
      let data = await this.database.executeSql(sql, [])
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            groupedInvoices = new GroupedInvoice(
                data.rows.item(i).Year,
                data.rows.item(i).TotalKg,
                data.rows.item(i).TotalValue,
                data.rows.item(i).AverageValue,
                data.rows.item(i).FarmId 
            );
          }
        }
      return groupedInvoices;
    }

    async searchBasicDataNames(farm:Farm){
      let basicData: string [] = [];
      try {
        let dep = await this.database.executeSql('SELECT Name FROM Departments WHERE Id="'+ farm.departmentId + '"', []);
        let mun = await this.database.executeSql('SELECT Name FROM Municipalities WHERE Id="'+ farm.municipalityId + '"', []);
        let vil = await this.database.executeSql('SELECT Name FROM Villages WHERE Id="'+ farm.villageId + '"', []);
        let owner = await this.database.executeSql('SELECT Name FROM OwnershipTypes WHERE Id="'+ farm.ownershipTypeId + '"', []);
        let coop = await this.database.executeSql('SELECT Name FROM Cooperatives WHERE Id="'+ farm.cooperativeId + '"', []);
        if(dep.rows.length > 0 || mun.rows.length > 0 || vil.rows.length > 0 || owner.rows.length > 0 || coop.rows.length > 0){
          basicData.push(dep.rows.item(0).Name);
          basicData.push(mun.rows.item(0).Name);
          basicData.push(vil.rows.item(0).Name);
          basicData.push(owner.rows.item(0).Name);
          basicData.push(coop.rows.item(0).Name);
        }
      } catch (error) {
        console.error(error)
      }
      return basicData;
    }

    async searchProductivityById(farmId:string){
      //let productivity: Productivity[] = [];
      let productivity: Productivity;
      let sql = 'SELECT * FROM Productivity WHERE FarmId="'+ farmId + '"';
      let data = await this.database.executeSql(sql, [])
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            productivity = new Productivity(
                data.rows.item(i).Id,
                data.rows.item(i).TotalHectares,
                data.rows.item(i).InfrastructureHectares,
                data.rows.item(i).ForestProtectedHectares,
                data.rows.item(i).ConservationHectares,
                data.rows.item(i).ShadingPercentage,
                data.rows.item(i).AverageAge,
                data.rows.item(i).AverageDensity,
                data.rows.item(i).PercentageColombia,
                data.rows.item(i).PercentageCaturra,
                data.rows.item(i).PercentageCastillo,
                data.rows.item(i).PercentageOtra,
                data.rows.item(i).CoffeeArea,
                data.rows.item(i).ProductionPlants,
                data.rows.item(i).ProductionPercentage,
                data.rows.item(i).ProductionAreaPercentage,
                data.rows.item(i).ProductionArea,
                data.rows.item(i).GrowingPlants,
                data.rows.item(i).GrowingPercentage,
                data.rows.item(i).GrowingAreaPercentage,
                data.rows.item(i).GrowingArea,
                data.rows.item(i).EstimatedProduction,
                data.rows.item(i).FarmId  
            );
          }
        }
      return productivity;
    }

    async searchPlantations(productivityId:string) {
      let plantations: Plantation[] = [];
      let sql = 'SELECT * FROM Plantations WHERE ProductivityId="'+ productivityId + '"';
      let data = await this.database.executeSql(sql,[])
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            plantations.push(
              {
                id: data.rows.item(i).Id,
                hectares: data.rows.item(i).Hectares,
                treesDistance: data.rows.item(i).TreesDistance,
                grooveDistance: data.rows.item(i).GrooveDistance,
                density: data.rows.item(i).Density,
                estimatedProduction: data.rows.item(i).EstimatedProduction,
                age: data.rows.item(i).Age,
                numberOfPlants: data.rows.item(i).NumberOfPlants,
                numberLot: data.rows.item(i).NumberLot,
                nomLot: data.rows.item(i).NomLot,
                labLot: data.rows.item(i).LabLot,
                tipoLot: data.rows.item(i).TipoLot,
                formLot: data.rows.item(i).FormLot,
                numEjeArbLot: data.rows.item(i).NumEjeArbLot,
                municipalityId: data.rows.item(i).MunicipalityId,
                villageId: data.rows.item(i).VillageId,
                productivityId: data.rows.item(i).ProductivityId,
                plantationStatusId: data.rows.item(i).PlantationStatusId,
                plantationTypeId: data.rows.item(i).PlantationTypeId,
                plantationVarietyId: data.rows.item(i).PlantationVarietyId
              }
            );
          }
        }
      return plantations;
    }

    async searchPlantationNames(plantationIds: PlantationIds){
      let plantationNames: PlantationNames = { plantationTypeName: '', plantationVarietyName: ''};
      try {
        let plantTypeName = await this.database.executeSql('SELECT Name FROM PlantationTypes WHERE Id="'+ plantationIds.plantationTypeId + '"', []);
        let plantVarieName = await this.database.executeSql('SELECT Name FROM PlantationVarieties WHERE Id="'+ plantationIds.plantationVarietyId + '"', []);
        if(plantTypeName.rows.length > 0 || plantVarieName.rows.length > 0 ){
          plantationNames.plantationTypeName = plantTypeName.rows.item(0).Name;
          plantationNames.plantationVarietyName = plantVarieName.rows.item(0).Name;
        }
      } catch (error) {
        console.error(error)
      }
      return plantationNames;
    }

    async searchFamilyMembers(farmId:string) {
      let familyMembers: FamilyMember[] = [];
      let sql = 'SELECT * FROM FamilyUnitMembers WHERE FarmId="'+ farmId + '"';
      let data = await this.database.executeSql(sql,[])
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            familyMembers.push(
              {
                id: data.rows.item(i).Id,
                firstName: data.rows.item(i).FirstName,
                lastName: data.rows.item(i).LastName,
                fullName: data.rows.item(i).FullName,
                age: data.rows.item(i).Age,
                identification: data.rows.item(i).Identification,
                education: data.rows.item(i).Education,
                phoneNumber: data.rows.item(i).PhoneNumber,
                relationship: data.rows.item(i).Relationship,
                maritalStatus: data.rows.item(i).MaritalStatus,
                isOwner: data.rows.item(i).IsOwner,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      return familyMembers;
    }

    async searchContacts(farmId:string) {
      let contacts: Contact[] = [];
      let sql = 'SELECT * FROM Contacts WHERE FarmId="'+ farmId + '"';
      let data = await this.database.executeSql(sql,[])
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            contacts.push(
              {
                id: data.rows.item(i).Id,
                name: data.rows.item(i).Name,
                date: data.rows.item(i).Date,
                comment: data.rows.item(i).Comment,
                actionType: data.rows.item(i).ActionType,
                topics: data.rows.item(i).Topics,
                userId: data.rows.item(i).UserId,
                contactTypeId: data.rows.item(i).ContactTypeId,
                contactLocation: data.rows.item(i).ContactLocation,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      return contacts;
    }

    async searchProjects(farmId:string) {
      let projects: Project[] = [];
      let sql = 'SELECT * FROM Projects WHERE FarmId="'+ farmId + '"';
      let data = await this.database.executeSql(sql,[])
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            projects.push(
              {
                name: data.rows.item(i).Name,
                projectTypeId: data.rows.item(i).ProjectTypeId,
                farmId: data.rows.item(i).FarmId
              }
            );
          }
        }
      return projects;
    }



}


