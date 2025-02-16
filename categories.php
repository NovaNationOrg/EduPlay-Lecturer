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
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <header>
            <div class="head-nav">
                <div class = "center">
                    <a class="game-name" href="index.html">Jeopardy</a></li>
                </div>
                <div class="left">
                    <a class="left-arrow" href="#"><span>&#129120;</span></a>
                </div>
            </div>
        </header>
        <main>
            <div class="game-container">
                <div class="game-board">
                    <div class="categories">
                        <?php 
                            $categories = array("Category 1", "Category 2", "Category 3", "Category 4", "Category 5");                           
                            for ($i = 0; $i < 5; $i++) {
                                echo "<div class='category-title'><a href='categoryedit.php'>" . $categories[$i] . "</a></div>";
                            }
                        ?>
                    </div>
                    <div class="question">
                        <?php
                        $questions = array(100, 200, 300, 400, 500);
                        for ($i = 1; $i < 6; $i++) {
                            for ($j = 0; $j < 5; $j++) {
                                echo "<div class='questions'>$" . $i . "00</div>";
                            }
                        }
                        ?>
                    </div>   
                </div>
            </div>
        </main>
        <footer>
            <p>&copy; 2025 EduPlay</p>
        </footer>
    </body>
</html>