CREATE DATABASE IF NOT EXISTS porsche_db;
USE porsche_db;

CREATE TABLE IF NOT EXISTS carros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    preco DECIMAL(12, 2) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    tipo_motor VARCHAR(50) NOT NULL,
    cavalos INT NOT NULL,
    velocidade_maxima INT,
    aceleracao_0_100 DECIMAL(4, 2),
    descricao TEXT,
    url_imagem VARCHAR(255),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO carros (modelo, ano, preco, cor, tipo_motor, cavalos, velocidade_maxima, aceleracao_0_100, descricao, url_imagem) VALUES
('911 Carrera', 2025, 1200000.00, 'Azul', 'Flat-6 Twin-Turbo', 379, 294, 4.0, 'O icônico esportivo da Porsche com desempenho excepcional.', 'https://files.porsche.com/filestore/image/multimedia/none/992-gt3-modelimage-sideshot/model/765dfc51-51bc-11eb-80d1-005056bbdc38/porsche-model.png'),
('Taycan Turbo S', 2025, 1900000.00, 'Cinza Claro', 'Elétrico', 750, 260, 2.6, 'O Porsche elétrico de alto desempenho que redefine a mobilidade.', 'https://www.stuttgartporsche.com.br//pub/modelos/versao/ofertas/taycan-turbo-s_oferta_241204_2832.png'),
('Cayenne Turbo GT', 2025, 1800000.00, 'Verde', 'V8 Biturbo', 631, 305, 3.1, 'O SUV mais potente da Porsche, combinando luxo e desempenho.', 'https://files.porsche.com/filestore/image/multimedia/none/e3-2nd-cayenne-modelimage-sideshot/model/9a1c5a6e-9a8b-11eb-80d5-005056bbdc38/porsche-model.png'),
('Panamera Turbo S', 2025, 1950000.00, 'Branco', 'V8 Twin-Turbo', 620, 325, 3.1, 'O sedã esportivo que oferece luxo e desempenho sem compromissos.', 'https://www.stuttgartporsche.com.br//pub/modelos/versao/ofertas/panamera-4s-ehybrid_oferta_241204_2742.png'),
('718 Cayman GT4 RS', 2025, 1500000.00, 'Cinza escuro', 'Flat-6', 493, 315, 3.2, 'O mais puro dos esportivos Porsche, com tecnologia de corrida.', 'https://www.stuttgartporsche.com.br//pub/modelos/versao/ofertas/718-cayman-gt4-rs_oferta_241204_5431.png');
