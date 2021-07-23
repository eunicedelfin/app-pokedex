<!DOCTYPE html>
<head>
	<title>Gotta Search 'em All</title>
	<link rel="stylesheet" href="pokedex-style.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
	<div class="outer-container">
		<h1>Gotta <span class="red"> Search Em</span> All</h1>
		<div class="inner-container">
			<div class="container">
				<!-- START of Left panel-->
				<div class="left-panel">
					<div class="name-box">
						<div class="item-name-box pokemonName"></div>
						<div class="item-name-box pokemonId"></div>
					</div>
					<img class="sprite-box" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png">
					<div class="controls-box">
						<div class="item-controls-box gender">
							<button aria-label="Change Gender" class="icon-border" >
								<i class="fa fa-venus" style="font-weight: bold;"></i>
							</button>
						</div>
						<div class="item-controls-box shiny">
							<button aria-label="Change to Shiny" class="text-border">
								SHINY
							</button>
						</div>
						<div class="item-controls-box rearFront">
							<button aria-label="Change Gender" class="icon-border">
								<i class="fa fa-undo"></i>
							</button>
						</div>
					</div>
					<div class="description-box">
						<div class="item-controls-box">
							<button aria-label="left" class="icon-border left">
								<i class="fa fa-arrow-left"></i>
							</button>
						</div>
						<div class="item-description-box"></div>
						<div class="item-controls-box">
							<button aria-label="right" class="icon-border right">
								<i class="fa fa-arrow-right"></i>
							</button>
						</div>
					</div>
				</div>
				<!-- END of Left panel-->
				<!-- START of center panel-->
				<div class="center-panel">
				</div>
				<!-- END of center panel-->
				<!-- START of right panel-->
				<div class="right-panel">
					<div class="stats-box">
						<div class="stats-box-left">
							<div class="stats-box-left-item1">
								<p class="weight"></p>
								<p class="height"></p>
							</div>
							<div class="stats-box-left-item2"></div>
						</div>
						<div class="stats-box-right">
							<p class="hp"></p>
							<p class="attack"></p>
							<p class="defense"></p>
							<p class="special_attack"></p>
							<p class="special_defense"></p>
							<p class="speed"></p>
						</div>
					</div>
					<div class="evolve-box">
						<div class="evolve-box-col">
							<div class="evolve-stage">I</div>
							<img id="stage1-sprite" class="sprite-small" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="">
							<div id="stage1" class="name">No Data</div>
						</div>
						<div class="evolve-box-col">
							<div class="evolve-stage">II</div>
							<img id="stage2-sprite" class="sprite-small" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="">
							<div id="stage2" class="name">No Data</div>
						</div>
						<div class="evolve-box-col">
							<div class="evolve-stage">III</div>
							<img id="stage3-sprite" class="sprite-small" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="">
							<div id="stage3" class="name">No Data</div>
						</div>
					</div>
					<div class="abilities-box-outer">
						<div class="abilities-box-inner">
							<div class="abilities-row">
								<div class="ability-left">
									<div class="ability-name"></div>
									<p class="accuracy"></p>
									<p class="power"></p>
									<p class="pp"></p>
								</div>
								<div class="ability-right">
									<div id="ability-type"></div>
									<p class="ability_class"></p>
									<p class="learned_at"></p>
									<p class="method"></p>
								</div>
							</div>
							<div class="ability-desc outer">
								<div class="ability-text-inner">
									<p id="short-desc">Boosts water-type moves for 5 turns.</p>
									<hr>
									<p><strong>Effect:</strong><span id="effect"> Changes the weather to rain for five turns, during which water moves inflict 50% extra damage, and fire moves inflict half damage.</span></p>
								</div>
							</div>
						</div>
						<button aria-label="left" class="icon-border shuffle_move">
							<i class="fa fa-random"></i>
						</button>
					</div>
					<div class="right-panel-controls">
						<button aria-label="left" class="icon-border prev" data-value>
							<i class="fa fa-arrow-down"></i>
						</button>
						<label>No:
							<input type="text" class="pokemon-id-input" value=0>	
						</label>	
						<button aria-label="left" class="icon-border next" data-value>
							<i class="fa fa-arrow-up"></i>
						</button>
					</div>
				</div>
				<!-- END of right panel-->
			</div>
		</div>
	</div>
</body>
</html>
<script src="https://code.jquery.com/jquery-3.6.0.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js" integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF" crossorigin="anonymous"></script>
<script src="pokedex2.js"></script>