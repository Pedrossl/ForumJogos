INSERT INTO niveis (id, nome) VALUES(1, 'Comum'),(2, 'Supervisor'),(3, 'Gerente'),(4, 'Administrador');


INSERT INTO notas (nota, jogo_id, usuario_id, createdAt, updatedAt) 
VALUES (4, 2, 7, NOW(), NOW());

DELIMITER $$

CREATE TRIGGER atualizar_avaFinal AFTER INSERT ON nota
FOR EACH ROW
BEGIN
  DECLARE totalVotos INT;
  DECLARE notaTotal DECIMAL(9, 2);
  DECLARE avaFinalValue VARCHAR(40);

  SELECT COUNT(*), SUM(nota) INTO totalVotos, notaTotal
  FROM nota
  WHERE jogo_id = NEW.jogo_id;

  IF totalVotos >= 5 THEN
    SET notaTotal = notaTotal / totalVotos;

    IF notaTotal < 2 THEN
      SET avaFinalValue = 'Ruim';
    ELSEIF notaTotal <= 2 AND notaTotal > 4 THEN
      SET avaFinalValue = 'Regular';
    ELSEIF notaTotal <= 4 AND notaTotal > 5 THEN
      SET avaFinalValue = 'Bom';
    ELSEIF notaTotal <= 5 THEN
      SET avaFinalValue = 'Ótimo';
    END IF;

    UPDATE jogos
    SET avaFinal = avaFinalValue
    WHERE id = NEW.jogo_id;
  ELSE

    SET avaFinalValue = 'Sem avaliação suficiente';
    UPDATE jogos
    SET avaFinal = avaFinalValue
    WHERE id = NEW.jogo_id;
  END IF;
END $$

DELIMITER ;


INSERT INTO nota (nota, jogo_id, usuario_id) VALUES (5, 1, 2);
