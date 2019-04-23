
INSERT INTO state (name,region,initials) VALUES ('Rio Grande do Sul', 'Sul','RS');
INSERT INTO state (name,region,initials) VALUES ('Santa Catarina', 'Sul','SC');
INSERT INTO state (name,region,initials) VALUES ('Paraná', 'Sul','PR');

INSERT INTO state (name,region,initials) VALUES ('São Paulo', 'Sudeste','SP');
INSERT INTO state (name,region,initials) VALUES ('Rio de Janeiro', 'Sudeste', 'RJ');
INSERT INTO state (name,region,initials) VALUES ('Espirito Santo', 'Sudeste', 'ES');
INSERT INTO state (name,region,initials) VALUES ('Minas Gerais', 'Sudeste', 'MG');

INSERT INTO state (name,region,initials) VALUES ('Mato Grosso do Sul', 'Centro Oeste','MS');
INSERT INTO state (name,region,initials) VALUES ('Mato Grosso', 'Centro Oeste','MT');
INSERT INTO state (name,region,initials) VALUES ('Goiás', 'Centro Oeste','GO');
INSERT INTO state (name,region,initials) VALUES ('Distrito Federal', 'Centro Oeste','DF');

INSERT INTO state (name,region,initials) VALUES ('Rondônia', 'Norte','RO');
INSERT INTO state (name,region,initials) VALUES ('Acre', 'Norte','AC');
INSERT INTO state (name,region,initials) VALUES ('Amazonas', 'Norte','AM');
INSERT INTO state (name,region,initials) VALUES ('Tocantins', 'Norte','TO');
INSERT INTO state (name,region,initials) VALUES ('Pará', 'Norte','PA');
INSERT INTO state (name,region,initials) VALUES ('Amapá', 'Norte','AM');
INSERT INTO state (name,region,initials) VALUES ('Roraima', 'Norte','RR');

INSERT INTO state (name,region,initials) VALUES ('Maranhão', 'Nordeste','MA');
INSERT INTO state (name,region,initials) VALUES ('Piauí', 'Nordeste','PI');
INSERT INTO state (name,region,initials) VALUES ('Ceará', 'Nordeste','Ceará');
INSERT INTO state (name,region,initials) VALUES ('Rio Grande do Norte', 'Nordeste','RN');
INSERT INTO state (name,region,initials) VALUES ('Paraiba', 'Nordeste','PB');
INSERT INTO state (name,region,initials) VALUES ('Pernambuco', 'Nordeste','PE');
INSERT INTO state (name,region,initials) VALUES ('Bahia', 'Nordeste','BA');

INSERT INTO city (stateId,name) VALUES (4,'Rio Grande');
INSERT INTO city (stateId,name) VALUES (4,'Pelotas');
INSERT INTO city (stateId,name) VALUES (4,'Porto Alegre');
INSERT INTO city (stateId,name) VALUES (5,'Florianópolis');
INSERT INTO city (stateId,name) VALUES (5,'Sombrio');

INSERT INTO stores (name,address,phone,cnpj,workingHour,city,state)
  VALUES ('Loja A','Rua ABC','(00) 0000-0000','00.000.000/0000-00','Diariamente das 11hs às 23hs','Rio Grande','RS');

INSERT INTO stores (name,address,phone,cnpj,workingHour,city,state)
  VALUES ('Loja B','Rua TRF','(00) 0000-0000','00.000.000/0000-00','Diariamente das 11hs às 23hs','Pelotas','RS');

INSERT INTO stores (name,address,phone,cnpj,workingHour,city,state)
  VALUES ('Loja C','Rua EF','(00) 0000-0000','00.000.000/0000-00','Diariamente das 11hs às 23hs','Rio Grande','RS');

INSERT INTO stores (name,address,phone,cnpj,workingHour,city,state)
  VALUES ('Loja D','Rua LDS','(00) 0000-0000','00.000.000/0000-00','Diariamente das 11hs às 23hs','Bage','RS');

INSERT INTO stores (name,address,phone,cnpj,workingHour,city,state)
  VALUES ('Loja E','Rua ABC','(00) 0000-0000','00.000.000/0000-00','Diariamente das 11hs às 23hs','Florianópolis','SC');

INSERT INTO stores (name,address,phone,cnpj,workingHour,city,state)
  VALUES ('Loja F','Rua HM','(00) 0000-0000','00.000.000/0000-00','Diariamente das 11hs às 23hs','Florianópolis','SC');

INSERT INTO stores (name,address,phone,cnpj,workingHour,city,state)
  VALUES ('Loja G','Rua AS','(00) 0000-0000','00.000.000/0000-00','Diariamente das 11hs às 23hs','Itajai','SC');