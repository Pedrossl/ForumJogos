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

  -- Obter o total de votos e a soma das notas do jogo relacionado à nova nota inserida
  SELECT COUNT(*), SUM(nota) INTO totalVotos, notaTotal
  FROM nota
  WHERE jogo_id = NEW.jogo_id;

  -- Verificar se o jogo possui votos suficientes para calcular a avaliação final
  IF totalVotos >= 5 THEN
    -- Calcular a média das notas
    SET notaTotal = notaTotal / totalVotos;

    -- Definir o valor do campo avaFinal com base na média das notas
    IF notaTotal < 2 THEN
      SET avaFinalValue = 'Ruim';
    ELSEIF notaTotal <= 2 AND notaTotal > 4 THEN
      SET avaFinalValue = 'Regular';
    ELSEIF notaTotal <= 4 AND notaTotal > 5 THEN
      SET avaFinalValue = 'Bom';
    ELSEIF notaTotal <= 5 THEN
      SET avaFinalValue = 'Ótimo';
    END IF;

    -- Atualizar o campo avaFinal do jogo relacionado à nova nota inserida
    UPDATE jogos
    SET avaFinal = avaFinalValue
    WHERE id = NEW.jogo_id;
  ELSE
    -- Caso o jogo não possua votos suficientes, definir o valor do campo avaFinal como 'Sem avaliação suficiente'
    SET avaFinalValue = 'Sem avaliação suficiente';
    UPDATE jogos
    SET avaFinal = avaFinalValue
    WHERE id = NEW.jogo_id;
  END IF;
END $$

DELIMITER ;


INSERT INTO nota (nota, jogo_id, usuario_id) VALUES (5, 1, 2);
