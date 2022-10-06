{ pkgs }: {
	deps = [
		pkgs.python39Full
  pkgs.sudo
  pkgs.iproute2
  pkgs.nodejs-17_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.replitPackages.jest
	];
}