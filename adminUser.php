<!-- <?php
session_start();
if (isset($_SESSION['username'])){
	$user_name = $_POST['username'];
	$password = $_POST['password'];
			if (empty($user_name)){
				echo "Username empty.";
			}else {
				if (empty($password)){
					echo "Password empty.";
							if (preg_match("/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32})/", $password, $match)){
								$intoIt = crypt($password,"Cta7g007");
								//echo "Password success.";
								try{
									$host = getenv('localhost');
									$username = getenv('C9_USER');
									$password = 'CTA210gq';
									$conn = new PDO("mysql:host=$host; dbname=$dbname", $username, $password);
									$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

									$user_name = filter_var($user_name,FILTER_SANITIZE_STRING);

									$new = "INSERT INTO Admin (username, password) VALUES ('$user_name', '$intoIt')";
									$conn->exec($new);
									echo "insertion succes!!";
								}catch (PDOException $e){
									echo $new . "<br>" . $e->getMessage();
								}

							} else {
								echo "No paswd match.";

							}
						}
					}
				}
			}
		}
	}
	}else {
		echo "Please login.";
	}
?> -->
