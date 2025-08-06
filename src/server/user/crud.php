<?php
// Name: Jihee Seo
// Assignment 2

// File Name: crud.php
// Date: 2025-08-05
// Description: user model to commnuticate to database

    class userCrud {
        private $db;

        function __construct($conn) {
            $this->db = $conn;
        } 
        
        public function insert(array $formData) {
            $firstName        = $formData['firstname'] ?? '';
            $lastName         = $formData['lastname'] ?? '';
            $email            = $formData['email'] ?? '';
            $password         = $formData['password'] ?? '';
            $confirmPassword  = $formData['confirm-password'] ?? '';
            $country          = $formData['country'] ?? '';
            $city             = $formData['city'] ?? '';
            $gender           = $formData['gender'] ?? '';

            try {
                $sql = "INSERT INTO `users`(`userEmail`, `password`, `firstName`, `lastName`, `country`, `city`, `gender`, `createdAt`, `updatedAt`) 
                        VALUES (:email, :password, :firstName, :lastName, :country, :city, :gender, NOW(), NOW())";
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $this->db->prepare($sql);
                $stmt->execute([
                    ':email'     => $email,
                    ':password'  => $hashedPassword,
                    ':firstName' => $firstName,
                    ':lastName'  => $lastName,
                    ':country'   => $country,
                    ':city'      => $city,
                    ':gender'    => $gender
                ]);

                return true;

            } catch(PDOException $e) {
                echo "Insert error" .  $e->getMessage();
                return false;
            }
        }

        public function update(array $formData) {
            $firstName        = $formData['firstname'] ?? '';
            $lastName         = $formData['lastname'] ?? '';
            $email            = $formData['email'] ?? '';
            $password         = $formData['password'] ?? '';
            $confirmPassword  = $formData['confirm_password'] ?? '';
            $country          = $formData['country'] ?? '';
            $city             = $formData['city'] ?? '';
            $gender           = $formData['gender'] ?? '';

            try {
                $sql = "UPDATE `users`
                        SET `password` = :password,
                            `firstName` = :firstName,
                            `lastName`  = :lastName,
                            `country`   = :country,
                            `city`      = :city,
                            `gender`    = :gender,
                            `updatedAt` = NOW()
                        WHERE `userEmail` = :email";

                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                $stmt = $this->db->prepare($sql);
                $stmt->execute([
                    ':password'  => $hashedPassword,
                    ':firstName' => $firstName,
                    ':lastName'  => $lastName,
                    ':country'   => $country,
                    ':city'      => $city,
                    ':gender'    => $gender,
                    ':email'     => $email
                ]);

                return true;

            } catch (PDOException $e) {
                echo "Update error: " . $e->getMessage();
                return false;
            }
        }

        public function getList() {
            try {
                $sql = "SELECT * FROM `users`";
                $result = $this->db->query($sql);
                return $result;

            } catch (PDOException $e) {
                echo "Query error: " . $e->getMessage();
                return [];
            }
        }

        public function getOne($email) {
            try {
                $sql = "SELECT * FROM `users` WHERE `userEmail` = :email LIMIT 1";
                $stmt = $this->db->prepare($sql);
                $stmt->bindParam(':email', $email);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                return $user !== false ? $user : null; 
            } catch (PDOException $e) {
                echo "Query error: " . $e->getMessage();
                return null;
            }
        }

        public function getOneByEmailAndPassword($email, $password) {
            try {
                $sql = "SELECT * FROM `users` WHERE `userEmail` = :email LIMIT 1";
                $stmt = $this->db->prepare($sql);
                $stmt->bindParam(':email', $email);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($user && password_verify($password, $user['password'])) {
                    return $user;
                }

                return null; 

            } catch (PDOException $e) {
                echo "Query error: " . $e->getMessage();
                return null;
            }
}
    }
?>