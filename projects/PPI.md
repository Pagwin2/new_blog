# Pagwin's Program Instantiator (PPI)

## The what

PPI is a program that I can use to create new projects, either from a git repo or via some program.

The commands and git repos are specified in a toml file like shown below.

```toml
[subcommands.skeletons]
cpp = ["https://git.pagwin.xyz/Pagwin/Cpp_template", "main"]

[subcommands.scripts]
rs = "cargo-quick"
npm = "npm-quick"
js = "vite-quick"
hs = "cabal-quick"

[patching]
prefix = "/home/pagwin/.local/share/patches/"

[patching.cmd_patches]
```

I forgot about that patching section so that might be something unfinished oops.

## What was learned

Libgit2 isn't very reliable so using the `git` cli is generally preferred for things like this.
