<?php
// Name: Jihee Seo
// Assignment 2

// File Name: crud.php
// Date: 2025-08-05
// Description: budget model to commnuticate to database

    class budgetCrud {
        private $db;

        function __construct($conn) {
            $this->db = $conn;
        } 
        
        public function insert(array $data, $type, $date, $userId) {
            $sql = "INSERT INTO `usertransactions` 
                    ( `userSurrogateId`, `transactionType`, `amount`, `notes`, `addedTime`, `category`)
                    VALUES (:userSurrogateId, :transactionType, :amount, :notes, :addedTime, :category)";

            $datetime = date('Y-m-d H:i:s', strtotime($date));
            try {
                $stmt = $this->db->prepare($sql);
                foreach ($data as $formData) {
                    $stmt->execute([
                        ':userSurrogateId'  => $userId,
                        ':transactionType'  => $type,
                        ':amount'           => $formData['amount'],
                        ':notes'            => $formData['note'],
                        ':addedTime'        => $datetime, // Ensure this is a valid timestamp
                        ':category'         => $formData['category']
                    ]);
                }
                return true;
            } catch(PDOException $e) {
                echo "Insert error: " . $e->getMessage();
                return false;
            }
        }

        public function update($userId, $data) {
            $sql = "UPDATE `usertransactions`
                    SET `transactionType` = :transactionType,
                        `amount` = :amount,
                        `notes` = :notes,
                        `addedTime` = :addedTime,
                        `category` = :category
                    WHERE `transactionId` = :transactionId
                    AND `userSurrogateId` = :userSurrogateId";

            $datetime = date('Y-m-d H:i:s', strtotime($data['date']));

            try {
                $stmt = $this->db->prepare($sql);

                $stmt->execute([
                    ':transactionType'   => $data['transactionType'],
                    ':amount'            => $data['amount'],
                    ':notes'             => $data['note'],
                    ':addedTime'         => $datetime,
                    ':category'          => $data['category'],
                    ':transactionId'     => $data['transactionId'],
                    ':userSurrogateId'   => $userId
                ]);

                return $stmt->rowCount() > 0; // true if update affected any row
            } catch (PDOException $e) {
                echo "Update error: " . $e->getMessage();
                return false;
            }
        }



        public function getList($start, $end,  $keyword, $filter, $userId) {
            try {
                // Format date for matching entire day
                $startDate = date('Y-m-d 00:00:00', strtotime($start));
                $endDate = date('Y-m-d 23:59:59', strtotime($end));
                
                $sql = "SELECT * FROM `usertransactions` 
                WHERE `userSurrogateId` = :userId
                AND `addedTime` BETWEEN :startDate AND :endDate";

                $params = [
                    ':userId' => $userId,
                    ':startDate' => $start . " 00:00:00",
                    ':endDate' => $end . " 23:59:59",
                ];

                if (!empty($filter)) {
                    $sql .= " AND `transactionType` = :filter";
                    $params[':filter'] = $filter;
                }

                if (!empty($keyword)) {
                    $sql .= " AND (`notes` LIKE :keyword OR `category` LIKE :keyword)";
                    $params[':keyword'] = '%' . $keyword . '%';
                }

                $sql .= " ORDER BY `addedTime` DESC";

                $stmt = $this->db->prepare($sql);
                $stmt->execute($params);

                return $stmt->fetchAll(PDO::FETCH_ASSOC);

            } catch (PDOException $e) {
                echo "Query error: " . $e->getMessage();
                return [];
            }
        }

        public function delete($transactionId, $userId) {
            try {
                $sql = "DELETE FROM `usertransactions` 
                        WHERE `transactionId` = :transactionId 
                        AND `userSurrogateId` = :userId";

                $stmt = $this->db->prepare($sql);
                $stmt->execute([
                    ':transactionId' => $transactionId,
                    ':userId'        => $userId
                ]);

                return $stmt->rowCount() > 0; // true if something was deleted

            } catch (PDOException $e) {
                echo "Delete error: " . $e->getMessage();
                return false;
            }
    }


    }
?>