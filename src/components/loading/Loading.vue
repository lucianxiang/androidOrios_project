<template>
	<div class="loader">
		<div class="loader-inner">
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
		</div>
	</div>
</template>
<style scoped type="text/less" lang="less">
  @r: 30rem;
	.loader {
		background: rgba(0,0,0,.8);
		background: -webkit-radial-gradient(#222, rgba(0,0,0,.8));
		background: radial-gradient(#222, rgba(0,0,0,.8));
		bottom: 0;
		left: 0;
		overflow: hidden;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 99999;
	}

	.loader-inner {
		bottom: 0;
		height: 60/@r;
		left: 0;
		margin: auto;
		position: absolute;
		right: 0;
		top: 0;
		width: 100/@r;
	}

	.loader-line-wrap {
		-webkit-animation: spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
		animation: spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
		box-sizing: border-box;
		height: 50/@r;
		left: 0;
		overflow: hidden;
		position: absolute;
		top: 0;
		-webkit-transform-origin: 50% 100%;
		transform-origin: 50% 100%;
		width: 100/@r;
	}
	.loader-line {
		border: 4/@r solid transparent;
		border-radius: 100%;
		box-sizing: border-box;
		height: 100/@r;
		left: 0;
		margin: 0 auto;
		position: absolute;
		right: 0;
		top: 0;
		width: 100/@r;
	}
	.loader-line-wrap:nth-child(1) { -webkit-animation-delay: -50ms; animation-delay: -50ms; }
	.loader-line-wrap:nth-child(2) { -webkit-animation-delay: -100ms; animation-delay: -100ms; }
	.loader-line-wrap:nth-child(3) { -webkit-animation-delay: -150ms; animation-delay: -150ms; }
	.loader-line-wrap:nth-child(4) { -webkit-animation-delay: -200ms; animation-delay: -200ms; }
	.loader-line-wrap:nth-child(5) { -webkit-animation-delay: -250ms; animation-delay: -250ms; }

	.loader-line-wrap:nth-child(1) .loader-line {
		border-color: hsl(0, 80%, 60%);
		height: 90/@r;
		width: 90/@r;
		top: 7/@r;
	}
	.loader-line-wrap:nth-child(2) .loader-line {
		border-color: hsl(60, 80%, 60%);
		height: 76/@r;
		width: 76/@r;
		top: 14/@r;
	}
	.loader-line-wrap:nth-child(3) .loader-line {
		border-color: hsl(120, 80%, 60%);
		height: 62/@r;
		width: 62/@r;
		top: 21/@r;
	}
	.loader-line-wrap:nth-child(4) .loader-line {
		border-color: hsl(180, 80%, 60%);
		height: 48/@r;
		width: 48/@r;
		top: 28/@r;
	}
	.loader-line-wrap:nth-child(5) .loader-line {
		border-color: hsl(240, 80%, 60%);
		height: 34/@r;
		width: 34/@r;
		top: 35/@r;
	}

	@-webkit-keyframes spin {
		0%, 15% {
			-webkit-transform: rotate(0);
			transform: rotate(0);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@keyframes spin {
		0%, 15% {
			-webkit-transform: rotate(0);
			transform: rotate(0);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
</style>
