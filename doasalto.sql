
CREATE DATABASE IF NOT EXISTS `doasaltoapi` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `doasaltoapi`;

-- Tabela para armazenar os dados das Organizações (ONGs)
-- Esta tabela conterá as informações de perfil e credenciais de login das ONGs.
CREATE TABLE `ongs` (
  `id_ong` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `cnpj` VARCHAR(18) NOT NULL UNIQUE, -- Formato: XX.XXX.XXX/XXXX-XX
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `senha` VARCHAR(255) NOT NULL, -- IMPORTANTE: Armazenar a senha como um hash (ex: bcrypt)
  `telefone` VARCHAR(20),
  `endereco` TEXT NOT NULL, -- Endereço completo para entrega das doações
  `descricao` TEXT, -- Um campo para a ONG descrever sua missão e trabalho
  `dados_bancarios` TEXT, -- Chave PIX, conta bancária, etc., para doações financeiras
  `data_cadastro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para categorizar os tipos de doações
-- Ajuda a organizar e filtrar as necessidades (ex: Alimentos, Roupas, Higiene).
CREATE TABLE `categorias` (
  `id_categoria` INT PRIMARY KEY AUTO_INCREMENT,
  `nome_categoria` VARCHAR(100) NOT NULL UNIQUE
);

-- Tabela principal para registrar as necessidades de cada ONG
-- É aqui que uma ONG irá cadastrar o que precisa, vinculando-se a uma categoria.
CREATE TABLE `necessidades` (
  `id_necessidade` INT PRIMARY KEY AUTO_INCREMENT,
  `id_ong` INT NOT NULL, -- Chave estrangeira para a tabela `ongs`
  `id_categoria` INT NOT NULL, -- Chave estrangeira para a tabela `categorias`
  `item_descricao` VARCHAR(255) NOT NULL, -- Descrição específica do item (ex: "Arroz Agulhinha Tipo 1")
  `quantidade_necessaria` INT, -- Quantidade desejada do item
  `unidade_medida` VARCHAR(50), -- Ex: "kg", "pacotes", "litros", "unidades"
  `status` ENUM('ativa', 'atendida') NOT NULL DEFAULT 'ativa', -- Status da necessidade
  `data_atualizacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Definição das chaves estrangeiras para garantir a integridade dos dados
  FOREIGN KEY (`id_ong`) REFERENCES `ongs`(`id_ong`) ON DELETE CASCADE,
  FOREIGN KEY (`id_categoria`) REFERENCES `categorias`(`id_categoria`)
);

-- Inserindo algumas categorias padrão para começar
INSERT INTO `categorias` (`nome_categoria`) VALUES
('Alimentos'),
('Roupas e Calçados'),
('Produtos de Higiene'),
('Móveis e Eletrodomésticos'),
('Recursos Financeiros'),
('Brinquedos'),
('Material Escolar');


-----------------------------------------------

-- Usando o banco de dados correto
-- USE `ifciencia_doacao_salto`;

-- Adicionando uma categoria extra para o exemplo com animais
INSERT INTO `categorias` (`nome_categoria`) VALUES ('Ração e Suprimentos Pet');

-- ===================================================================================
-- INSERTS PARA A TABELA `ongs`
-- ===================================================================================

-- ONG 1: Foco em Crianças e Adolescentes (Baseado na Casa de Belém)
INSERT INTO `ongs` 
(`nome`, `cnpj`, `email`, `senha`, `telefone`, `endereco`, `descricao`, `dados_bancarios`) 
VALUES 
('Casa de Belém de Salto', '01.123.456/0001-11', 'contato@casadebelem.org.br', '$2a$10$fWJ.s5f.s.s5f.s.s5f.su5f.s5f.s5f.s5f.s5f.s5f.s5f.s5f.s5', '(11) 4029-1234', 'Rua das Crianças, 100, Vila Nova, Salto - SP, 13320-000', 'Instituição de acolhimento que atende crianças e adolescentes em situação de vulnerabilidade social, oferecendo moradia, educação e apoio psicossocial.', 'PIX (CNPJ): 01.123.456/0001-11');

-- ONG 2: Foco em Idosos (Baseado no Lar Frederico Ozanam)
INSERT INTO `ongs` 
(`nome`, `cnpj`, `email`, `senha`, `telefone`, `endereco`, `descricao`, `dados_bancarios`) 
VALUES 
('Lar Frederico Ozanam', '02.234.567/0001-22', 'contato@larozanamsalto.org.br', '$2a$10$fWJ.s5f.s.s5f.s.s5f.su5f.s5f.s5f.s5f.s5f.s5f.s5f.s5f.s5', '(11) 4028-5678', 'Av. dos Idosos, 200, Centro, Salto - SP, 13320-100', 'Casa de repouso que acolhe idosos, proporcionando cuidados com a saúde, alimentação, lazer e bem-estar na terceira idade.', 'Banco Exemplo | Ag: 0001 | C/C: 12345-6');

-- ONG 3: Foco em Animais (Baseado na AAMAS - Associação Amigos dos Animais de Salto)
INSERT INTO `ongs` 
(`nome`, `cnpj`, `email`, `senha`, `telefone`, `endereco`, `descricao`, `dados_bancarios`) 
VALUES 
('AAMAS - Amigos dos Animais', '03.345.678/0001-33', 'contato@aamas.org.br', '$2a$10$fWJ.s5f.s.s5f.s.s5f.su5f.s5f.s5f.s5f.s5f.s5f.s5f.s5f.s5', '(11) 98765-4321', 'Estrada dos Animais, 300, Bairro Rural, Salto - SP, 13329-000', 'Associação voluntária dedicada ao resgate, cuidado e adoção responsável de cães e gatos em situação de abandono e maus-tratos na cidade de Salto.', 'PIX (Celular): (11) 98765-4321');


-- ===================================================================================
-- INSERTS PARA A TABELA `necessidades`
-- Assumindo que os IDs das ONGs serão 1, 2 e 3, e os IDs das categorias seguem a ordem original.
-- Categoria IDs: 1-Alimentos, 2-Roupas, 3-Higiene, 6-Brinquedos, 7-Material Escolar, 8-Ração/Pet
-- ===================================================================================

-- Necessidades para a Casa de Belém (id_ong = 1)
INSERT INTO `necessidades` (`id_ong`, `id_categoria`, `item_descricao`, `quantidade_necessaria`, `unidade_medida`) VALUES
(1, 1, 'Leite em pó integral (lata 400g)', 50, 'latas'),
(1, 1, 'Achocolatado em pó', 30, 'pacotes'),
(1, 3, 'Fraldas descartáveis tamanho G', 100, 'pacotes'),
(1, 7, 'Cadernos brochura capa dura', 80, 'unidades'),
(1, 6, 'Bolas de futebol e vôlei', 10, 'unidades');

-- Necessidades para o Lar Frederico Ozanam (id_ong = 2)
INSERT INTO `necessidades` (`id_ong`, `id_categoria`, `item_descricao`, `quantidade_necessaria`, `unidade_medida`) VALUES
(2, 1, 'Suplemento alimentar para idosos (Nutren Senior ou similar)', 60, 'latas'),
(2, 3, 'Fraldas geriátricas tamanho M e G', 150, 'pacotes'),
(2, 3, 'Sabonete líquido antisséptico', 40, 'litros'),
(2, 2, 'Meias de algodão para adulto', 100, 'pares');

-- Necessidades para a AAMAS (id_ong = 3)
INSERT INTO `necessidades` (`id_ong`, `id_categoria`, `item_descricao`, `quantidade_necessaria`, `unidade_medida`) VALUES
(3, 8, 'Ração para cães filhotes (pacote 15kg)', 20, 'pacotes'),
(3, 8, 'Ração para gatos adultos castrados (pacote 10kg)', 30, 'pacotes'),
(3, 8, 'Areia higiênica para gatos', 50, 'pacotes'),
(3, 3, 'Produtos de limpeza (água sanitária e desinfetante)', 100, 'litros');