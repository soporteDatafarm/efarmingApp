CREATE TABLE IF NOT EXISTS "SupplyChain" (
	"Id"	TEXT NOT NULL,
	"NombreJunto"	TEXT,
	"NameSuppliers"	TEXT,
	"NameSupplyChains"	TEXT,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "ContactLocation" (
	"Id"	INTEGER NOT NULL,
	"Name"	TEXT,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "ContactName" (
	"Id"	INTEGER NOT NULL,
	"Name"	TEXT,
	PRIMARY KEY("Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "ContactTopic" (
	"Id"	INTEGER NOT NULL,
	"Name"	TEXT,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "ContactType" (
	"Id"	INTEGER NOT NULL,
	"Name"	TEXT,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Cooperatives" (
	"Id"	TEXT,
	"Name"	TEXT,
	"CreatedAt"	DATE,
	"UpdateAt"	DATE,
	"DeletedAt"	DATE,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Countries" (
	"Id"	TEXT,
	"Name"	TEXT,
	"CreatedAt"	DATE,
	"UpdateAt"	DATE,
	"DeletedAt"	DATE,
	"Code"	INTEGER,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Departments" (
	"Id"	TEXT,
	"Name"	TEXT,
	"CreatedAt"	DATE,
	"UpdateAt"	DATE,
	"DeletedAt"	DATE,
	"Code"	INTEGER,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "FarmStatus" (
	"Id"	TEXT,
	"Name"	TEXT,
	"CreatedAt"	DATE,
	"UpdateAt"	DATE,
	"DeletedAt"	DATE,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Municipalities" (
	"Id"	TEXT,
	"Name"	TEXT,
	"DepartmentId"	TEXT,
	"CreatedAt"	DATE,
	"UpdateAt"	DATE,
	"DeletedAt"	DATE,
	"Code"	INTEGER,
	FOREIGN KEY("DepartmentId") REFERENCES "Departments"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "OwnershipTypes" (
	"Id"	TEXT,
	"Name"	TEXT,
	"CreatedAt"	DATE,
	"UpdateAt"	DATE,
	"DeletedAt"	DATE,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "PlantationStatus" (
	"Id"	TEXT,
	"Name"	TEXT,
	"CreatedAt"	DATE,
	"UpdateAt"	DATE,
	"DeletedAt"	DATE,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "PlantationTypes" (
	"Id"	TEXT,
	"Name"	TEXT,
	"CreatedAt"	DATE,
	"UpdateAt"	DATE,
	"DeletedAt"	DATE,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "PlantationVarieties" (
	"Id"	TEXT,
	"Name"	TEXT,
	"PlantationTypeId"	TEXT,
	"CreatedAt"	DATE,
	"UpdateAt"	DATE,
	"DeletedAt"	DATE,
	FOREIGN KEY("PlantationTypeId") REFERENCES "PlantationTypes"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "FloweringPeriodsQualifications" (
	"Id"	TEXT,
	"Name"	TEXT,
	"CreatedAt"	DATE,
	"UpdateAt"	DATE,
	"DeletedAt"	DATE,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "ProjectTypes" (
	"Id"	TEXT NOT NULL,
	"Name"	TEXT,
	"Description"	TEXT,
	"CreatedAt"	TEXT,
	"UpdatedAt"	TEXT,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Suppliers" (
	"Id"	TEXT,
	"Name"	TEXT,
	"CountryId"	TEXT,
	"CreatedAt"	DATE,
	"UpdateAt"	DATE,
	"DeletedAt"	DATE,
	"LogoUrl"	TEXT,
	FOREIGN KEY("CountryId") REFERENCES "Countries"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Villages" (
	"Id"	TEXT,
	"Name"	TEXT,
	"MunicipalityId"	TEXT,
	"CreatedAt"	DATE,
	"UpdateAt"	DATE,
	"DeletedAt"	DATE,
	"Code"	INTEGER,
	FOREIGN KEY("MunicipalityId") REFERENCES "Municipalities"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "ConfigurationInfo" (
	"Id"	INTEGER NOT NULL,
	"Name"	TEXT,
	"Vector"	TEXT,
	PRIMARY KEY("Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "InformacionInicial" (
	"Id"	TEXT NOT NULL,
	"Sub"	TEXT,
	"Role"	TEXT,
	"FullName"	TEXT,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "AssignedFarms" (
	"Id"	TEXT NOT NULL,
	"Code"	TEXT,
	"Name"	TEXT,
	"Farmer"	TEXT,
	"DepartmentId"	TEXT,
	"MunicipalityId"	TEXT,
	"VillageId"	TEXT,
	FOREIGN KEY("MunicipalityId") REFERENCES "Municipalities"("Id"),
	FOREIGN KEY("VillageId") REFERENCES "Villages"("Id"),
	FOREIGN KEY("DepartmentId") REFERENCES "Departments"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Farms" (
	"Id"	TEXT NOT NULL,
	"Code"	TEXT,
	"Name"	TEXT,
	"CurrentTechnician"	TEXT,
	"Longitude"	TEXT,
	"Latitude"	TEXT,
	"Elevation"	TEXT,
	"DensityIndicator"	TEXT,
	"Plants"	INTEGER,
	"Hectares"	REAL,
	"FertilizerIndicator"	TEXT,
	"ProductivePlants"	INTEGER,
	"FertilizerBags"	REAL,
	"ProductivityIndicator"	TEXT,
	"EstimatedProduction"	REAL,
	"AgeIndicator"	INTEGER,
	"SupplyChainId"	TEXT,
	"VillageId"	TEXT,
	"MunicipalityId"	TEXT,
	"DepartmentId"	TEXT,
	"FarmStatusId"	TEXT,
	"CooperativeId"	TEXT,
	"OwnershipTypeId"	TEXT,
	FOREIGN KEY("SupplyChainId") REFERENCES "SupplyChain"("Id"),
	FOREIGN KEY("CooperativeId") REFERENCES "Cooperatives"("Id"),
	FOREIGN KEY("VillageId") REFERENCES "Villages"("Id"),
	FOREIGN KEY("FarmStatusId") REFERENCES "FarmStatus"("Id"),
	FOREIGN KEY("OwnershipTypeId") REFERENCES "OwnershipTypes"("Id"),
	FOREIGN KEY("DepartmentId") REFERENCES "Departments"("Id"),
	FOREIGN KEY("MunicipalityId") REFERENCES "Municipalities"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "GeoLocation" (
	"Id"	INTEGER NOT NULL,
	"CoordinateSystemId"	INTEGER,
	"WellKnowText"	TEXT,
	"FarmId"	TEXT,
	FOREIGN KEY("FarmId") REFERENCES "Farms"("Id"),
	PRIMARY KEY("Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "FarmsSupplyChain" (
	"Id"	TEXT NOT NULL,
	"StartDate"	TEXT,
	"EndDate"	TEXT,
	"Potencial"	REAL,
	"Bags"	REAL,
	"Code"	INTEGER,
	"Address"	TEXT,
	"SupplierId"	TEXT,
	"QualityProfileId"	TEXT,
	"SupplyChainStatusId"	TEXT,
	"DepartmentId"	TEXT,
	"FarmId"	TEXT,
	FOREIGN KEY("SupplierId") REFERENCES "Suppliers"("Id"),
	FOREIGN KEY("DepartmentId") REFERENCES "Departments"("Id"),
	FOREIGN KEY("FarmId") REFERENCES "Farms"("Id")
);
CREATE TABLE IF NOT EXISTS "Workers" (
	"Id"	TEXT NOT NULL,
	"PermanentWomen"	INTEGER,
	"PermanentMen"	INTEGER,
	"TemporaryWomen"	INTEGER,
	"TemporaryMen"	INTEGER,
	"FarmId"	TEXT,
	FOREIGN KEY("FarmId") REFERENCES "Farms"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "FamilyUnitMembers" (
	"Id"	TEXT NOT NULL,
	"FirstName"	TEXT,
	"LastName"	TEXT,
	"FullName"	TEXT,
	"Age"	TEXT,
	"Identification"	TEXT,
	"Education"	TEXT,
	"PhoneNumber"	TEXT,
	"Relationship"	TEXT,
	"MaritalStatus"	TEXT,
	"IsOwner"	NUMERIC,
	"FarmId"	TEXT,
	FOREIGN KEY("FarmId") REFERENCES "Farms"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "AssociatedPeople" (
	"Id"	TEXT,
	"UserName"	TEXT,
	"Email"	TEXT,
	"Password"	TEXT,
	"Salt"	TEXT,
	"FirstName"	TEXT,
	"LastName"	TEXT,
	"FullName"	TEXT,
	"IsActive"	NUMERIC,
	"SensoryProfileAssessments"	TEXT,
	"RoleName"	TEXT,
	"FarmId"	TEXT,
	FOREIGN KEY("FarmId") REFERENCES "Farms"("Id")
);
CREATE TABLE IF NOT EXISTS "Productivity" (
	"Id"	TEXT NOT NULL,
	"TotalHectares"	TEXT,
	"InfrastructureHectares"	TEXT,
	"ForestProtectedHectares"	TEXT,
	"ConservationHectares"	TEXT,
	"ShadingPercentage"	TEXT,
	"AverageAge"	REAL,
	"AverageDensity"	TEXT,
	"PercentageColombia"	REAL,
	"PercentageCaturra"	REAL,
	"PercentageCastillo"	REAL,
	"PercentageOtra"	REAL,
	"CoffeeArea"	TEXT,
	"ProductionPlants"	REAL,
	"ProductionPercentage"	REAL,
	"ProductionAreaPercentage"	REAL,
	"ProductionArea"	TEXT,
	"GrowingPlants"	REAL,
	"GrowingPercentage"	REAL,
	"GrowingAreaPercentage"	REAL,
	"GrowingArea"	TEXT,
	"EstimatedProduction"	REAL,
	"FarmId"	TEXT,
	FOREIGN KEY("FarmId") REFERENCES "Farms"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Plantations" (
	"Id"	TEXT NOT NULL,
	"Hectares"	TEXT,
	"TreesDistance"	TEXT,
	"GrooveDistance"	TEXT,
	"Density"	TEXT,
	"EstimatedProduction"	TEXT,
	"Age"	TEXT,
	"NumberOfPlants"	INTEGER,
	"NumberLot"	INTEGER,
	"NomLot"	TEXT,
	"LabLot"	TEXT,
	"TipoLot"	TEXT,
	"FormLot"	TEXT,
	"NumEjeArbLot"	INTEGER,
	"MunicipalityId"	TEXT,
	"VillageId"	TEXT,
	"ProductivityId"	TEXT,
	"PlantationStatusId"	TEXT,
	"PlantationTypeId"	TEXT,
	"PlantationVarietyId"	TEXT,
	FOREIGN KEY("PlantationStatusId") REFERENCES "PlantationStatus"("Id"),
	FOREIGN KEY("VillageId") REFERENCES "Villages"("Id"),
	FOREIGN KEY("ProductivityId") REFERENCES "Productivity"("Id"),
	FOREIGN KEY("MunicipalityId") REFERENCES "Municipalities"("Id"),
	FOREIGN KEY("PlantationTypeId") REFERENCES "PlantationTypes"("Id"),
	FOREIGN KEY("PlantationVarietyId") REFERENCES "PlantationVarieties"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "FloweringPeriods" (
	"Id"	TEXT NOT NULL,
	"StartDate"	TEXT,
	"StartDateFormated"	TEXT,
	"FloweringPeriodQualificationId"	TEXT,
	"PlantationId"	TEXT,
	FOREIGN KEY("PlantationId") REFERENCES "Plantations"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Fertilizers" (
	"Id"	TEXT NOT NULL,
	"InvoiceNumber"	INTEGER,
	"FarmerIdentification"	INTEGER,
	"Ubication"	INTEGER,
	"Date"	TEXT,
	"Value"	REAL,
	"Hold"	INTEGER,
	"CashRegister"	INTEGER,
	"UnitPrice"	REAL,
	"Quantity"	REAL,
	"Name"	TEXT,
	"FormatedDate"	TEXT,
	"InputDateFormated"	TEXT,
	"FarmId"	TEXT,
	FOREIGN KEY("FarmId") REFERENCES "Farms"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Invoices" (
	"Id"	TEXT NOT NULL,
	"InvoiceNumber"	INTEGER,
	"Identification"	TEXT,
	"Value"	REAL,
	"DateInvoice"	TEXT,
	"Ubication"	INTEGER,
	"Hold"	INTEGER,
	"Cash"	REAL,
	"Weight"	REAL,
	"BaseKg"	REAL,
	"CoffeeTypeId"	INTEGER,
	"Date"	TEXT,
	"FormatedDate"	TEXT,
	"InputDateFormated"	TEXT,
	"FarmId"	TEXT,
	FOREIGN KEY("FarmId") REFERENCES "Farms"("Id"),
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "GroupedInvoices" (
	"Year"	INTEGER,
	"TotalKg"	REAL,
	"TotalValue"	REAL,
	"AverageValue"	REAL,
	"FarmId"	TEXT,
	FOREIGN KEY("FarmId") REFERENCES "Farms"("Id")
);
CREATE TABLE IF NOT EXISTS "GroupedFertilizers" (
	"Year"	INTEGER,
	"Quantity"	REAL,
	"TotalValue"	REAL,
	"AveragePrice"	REAL,
	"FarmId"	TEXT,
	FOREIGN KEY("FarmId") REFERENCES "Farms"("Id")
);
CREATE TABLE IF NOT EXISTS "Projects" (
	"ProjectTypeId"	TEXT,
	"FarmId"	TEXT,
	FOREIGN KEY("FarmId") REFERENCES "Farms"("Id"),
	FOREIGN KEY("ProjectTypeId") REFERENCES "ProjectTypes"("Id")
);
CREATE TABLE IF NOT EXISTS "Contacts" (
	"Id"	TEXT NOT NULL,
	"Name"	TEXT,
	"Date"	TEXT,
	"Comment"	TEXT,
	"ActionType"	TEXT,
	"Topics"	TEXT,
	"UserId"	TEXT,
	"ContactTypeId"	INTEGER,
	"ContactLocationId"	INTEGER,
	"FarmId"	TEXT,
	FOREIGN KEY("FarmId") REFERENCES "Farms"("Id"),
	FOREIGN KEY("ContactTypeId") REFERENCES "ContactType"("Id"),
	FOREIGN KEY("ContactLocationId") REFERENCES "ContactLocation"("Id"),
	PRIMARY KEY("Id")
);
