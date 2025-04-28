DELIMITER //

CREATE PROCEDURE InsertProductsFromJSON(IN input_json JSON)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE j INT DEFAULT 0;
    DECLARE k INT DEFAULT 0;
    DECLARE l INT DEFAULT 0;
    DECLARE products_count INT DEFAULT JSON_LENGTH(input_json->'$.products');
    
    WHILE i < products_count DO
        -- Insert Product
        INSERT INTO Products (name, description, category, image, status, tags)
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].name'))),
            JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].description'))),
            JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].category'))),
            JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].image'))),
            JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].status'))),
            JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].tags'))
        );
        
        SET @product_id = LAST_INSERT_ID();
        
        -- Insert Restrictions
        SET j = 0;
        SET @restrictions_count = JSON_LENGTH(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].restrictions')));
        
        WHILE j < @restrictions_count DO
            INSERT INTO ProductRestrictions (product_id, type, sub_type, value)
            VALUES (
                @product_id,
                JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].restrictions[', j, '].type'))),
                JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].restrictions[', j, '].subType'))),
                JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].restrictions[', j, '].value')))
            );
            SET j = j + 1;
        END WHILE;
        
        -- Insert Types
        SET k = 0;
        SET @types_count = JSON_LENGTH(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].types')));
        
        WHILE k < @types_count DO
            SET @type_id = JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].types[', k, '].id'));
            SET @type_name = JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].types[', k, '].name')));
            SET @type_status = JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].types[', k, '].status')));
            
            -- Check if ProductType exists
            IF NOT EXISTS (SELECT 1 FROM ProductTypes WHERE id = @type_id) THEN
                INSERT INTO ProductTypes (id, name, status)
                VALUES (@type_id, @type_name, @type_status);
            END IF;
            
            INSERT INTO ProductTypeAmounts (product_id, type_id, price, currency, status)
            VALUES (
                @product_id,
                @type_id,
                JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].types[', k, '].price'))),
                JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].types[', k, '].currency'))),
                @type_status
            );
            
            SET @product_type_amount_id = LAST_INSERT_ID();
            
            -- Insert Distributions
            SET l = 0;
            SET @distributions_count = JSON_LENGTH(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].types[', k, '].distributions')));
            
            WHILE l < @distributions_count DO
                SET @distribution_id = JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].types[', k, '].distributions[', l, '].id'));
                SET @distribution_name = JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].types[', k, '].distributions[', l, '].name')));
                
                -- Check if Distribution exists
                IF NOT EXISTS (SELECT 1 FROM ProductTypeDistributions WHERE id = @distribution_id) THEN
                    INSERT INTO ProductTypeDistributions (id, name, status)
                    VALUES (@distribution_id, @distribution_name, 'active');
                END IF;
                
                INSERT INTO ProductTypeDistributionAmounts (product_type_amount_id, product_type_distribution_id, amount)
                VALUES (
                    @product_type_amount_id,
                    @distribution_id,
                    JSON_UNQUOTE(JSON_EXTRACT(input_json, CONCAT('$.products[', i, '].types[', k, '].distributions[', l, '].amount')))
                );
                
                SET l = l + 1;
            END WHILE;
            
            SET k = k + 1;
        END WHILE;
        
        SET i = i + 1;
    END WHILE;
END //

DELIMITER ;