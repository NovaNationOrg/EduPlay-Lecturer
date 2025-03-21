<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EduPlay</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fontdiner+Swanky&display=swap">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Risque' >
        <link rel="stylesheet" href="summary.css">
        <link rel="stylesheet" href="categorystyle.css">
    </head>
    <body>
    
        <header>
            <div class="head-nav">
                <div class = "center">
                <h2> Jeopardy </h2>
                </div>
            <!-- <div class="left">
                <a class="left-arrow" href="#"><span style="color: white;">&#129120;</span></a>
            </div> -->
            </div>
        </header>
        <main>
            <div class="game-container">
                <div class="game-board">
                    <div class="categories">
                        <?php 
                            $categories = array("Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6");                           
                            for ($i = 0; $i < 6; $i++) {
                            ?>

                                <div class='category-title'>
                                    <button class="modalCategory" id="openModal"><?php echo $categories[$i]; ?></button>
                                </div>
                            <?php
                            }
                        ?>
                    </div>
                    <div class="question">
                        <?php
                        $questions = array(100, 200, 300, 400, 500, 600);
                        for ($i = 1; $i < 6; $i++) {
                            for ($j = 0; $j < 6; $j++) {
                                echo "<div class='questions'><button class='modalCategory' id='openModal'>$" . $i . "00</button></div>";
                            }
                        }
                        ?>
                    </div>  
                    <div id="modal" class="modal-overlay">
                        <div class="modal-container">
                            <button class="close-button" id="closeButton"> X </button>
                            <div class="modal-content">
                                <div class="modal-title">Summary</div>
                                <?php 
                                                for ($i = 1; $i < 6; $i++) {
                                            ?>
                                                <div class="input-box" style="background-color: transparent;">
                                                    <div class="input-fields">
                                                        <input type="text" class="input" id="question<?php echo $i ?>" name="question<?php echo $i ?>" placeholder=" Question <?php echo $i ?>" disabled>
                                                        <input type="text" class="input" id="answer<?php echo $i ?>" name="answer<?php echo $i ?>" placeholder="Answer <?php echo $i ?>" disabled>
                                                    </div>
                                                </div>    
                                            <?php
                                                }
                                            ?>
                                             <a href="/qr.html">Begin!</a>
                                             <br>

                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <p>&copy; 2025 EduPlay</p>
        </footer>
    <script src="categoryscript.js"></script>
    </body>
</html>