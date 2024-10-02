---

title: "Setting up CD for this site"

description: "How I setup Github actions to automatically update this site"

date: 2022-01-22

draft: false

---

So recently I got a bit of a bee in my bonnet to go setup CD for this website. The main reasons that drove this were 1. deploying the site was mildly tedious which is a good enough reason on it's own and 2. I wanted to learn how to do it.



## Wait but how did I find out about and how to do this?

I was aware of Github actions and a vague sense of how it should work observing how things went when I made my small contribution to [Gerald](https://github.com/Gerald-Development/Barista-Gerald). But observing that didn't really give a sense of how it worked. What did was when my friend [Micha](https://github.com/michalusio) was working on implementing [their own blog](https://lochalhost.pl) and set things up with Github actions to implement CI/CD. Then I saw [this Fireship video](https://www.youtube.com/watch?v=eB0nUzAI7M8) which gave me a nice amount of context for this. Even with that bit of knowledge on how to setup stuff with Github actions I didn't really have a motivation to go do it.



## The spark to actually do it

Then for a couple of reasons wanted to write a blog article about progress on [Pogo](https://github.com/Pagwin-Fedora/Pogo). But I decided that before I wrote any more articles that I should go look into setting up CD for my site.



## Implementing CD with Github actions

So with inspiration in my heart to go and do stuff with Github actions I began. First off I needed to set up the condition for my workflow running which was a pretty simple as I wasn't really doing anything interesting here.

```yaml

on:

    push:

        branches:

            - master

```


## The jobs

I knew due to reading some pages on Github's action market place and previous context that I would need to have at least 3 if not more steps

1. checkout the code

2. use Hugo to build the site

3. deploy to my VPS



So going through each of those steps in order to see how I went about doing them first we have checking the code out which was a pretty simple `uses: actions/checkout@v2` additionally telling it to fetch submodules due to the structure of my project. After checking out the code I had to use Hugo and conveniently there was a module for Hugo `peaceiris/actions-hugo@v2` although sadly it only installs Hugo so another step would have to be added to build the app. But that step was a pretty simple `run: hugo --minify`. I will say though that if the example on the marketplace page didn't use the `--minify` option I wouldn't have either because I didn't know it existed so that was a nice little learning experience. After building the code I needed to deploy it which due to this being a static site was theoretically as simple as copying files with rsync. But I didn't want to have an automated action have access to root or my user for security and anti-stupidity reasons. To implement that I had to leave the realm of Github actions and go over to my VPS to set some stuff up.



## Some work on the VPS

That stuff in question was adding a new user and changing the perms of /var/www/pagwin.xyz so that new user could edit files there. This was pretty simple.

```sh

sudo useradd website # I can hear people laughing at me already for not passing the -m option but relax I'll explain later

sudo chown -R website:www-data /var/www/pagwin.xyz # btw I didn't explain earlier but my website files are in /var/www/pagwin.xyz not /var/www/html because I'm hosting multiple sites on this VPS and the folder change makes it easier to keep track of which one I'm screwing with

```

However my unwillingness to have the new user have a home directory for cleanliness and to avoid unnecessarily leaving a user that could receive emails(I have an email server setup on this VPS as well) I didn't create a home directory. But in order for the deployment workflow on Github to deploy to the VPS via rsync it would need ssh access... Okay the problem may not be obvious if you don't understand ssh/good security practices very well. The problem is that in order to login to ssh via an ssh key you need to put that key into `$user_home/.ssh/authorized_keys` which requires the user have a home directory that I am unwilling to create. Password authentication is also not an option because allowing password auth on to a server is insecure compared to only allowing ssh keys. This is especially true when the ssh login is being done by an automated system. Also my VPS requires the usage of a TOTP if you login via a password and setting that up for Github actions sounds like a nightmare. Also also in order for the server to know the TOTP which requires a file... which goes into the home directory meaning nothing has changed or improved by trying to use a password. 

Conveniently while `$user_home/.ssh/authorized_keys` is the default location for ssh public keys it's pretty easy to add another location for sshd to look for authorized_keys just by adding the line `AuthorizedKeysFile .ssh/authorized_keys /etc/ssh/keys/%u.authorized.pub` to `/etc/ssh/sshd_config` where the later bit of `/etc/ssh/keys/%u.authorized.pub` is added on from the default. That last bit of the config tells ssh to look for the public keys at an additional location where the username of the user trying to login replaces %u. After that whole hassle is done with generating the ssh key is pretty simple with `ssh-keygen` and putting the public key in the right spot. Adding the private key as a Github secret was annoying however but I'll discuss that in the [#Dealing With My Stupidity](#Dealing%20With%20My%20Stupidity(and%20a%20private%20ssh%20key)) section.



## What were we talking about oh yeah Github actions

anyways yeah this is what I initially(spoiler I change it) wrote for Github actions to go and deploy the app.

```yaml

uses: up9cloud/action-rsync@master

env:

  HOST: pagwin.xyz

  KEY: ${{secrets.SSH_KEY}}

  TARGET: /var/www/pagwin.xyz/

```

With that I saved the file to `.github/website-publish.yml` and felt a mild sense of accomplishment. In hindsight that sense and first file are hilarious and while I would love to immediately explain why first I want to take a second to show a step I added after I finished dealing with my stupidity. That step is a cleanup step that deletes the old site before copying over the new one so people can't snoop around in redundant files. I implemented that with this tidbit.

```yaml

uses: appleboy/ssh-action@master

with:

  host: pagwin.xyz

  username: website

  key: ${{secrets.SSH_KEY}}

  script: rm -rf /var/www/pagwin.xyz/*

```



## Dealing With My Stupidity(and a private ssh key)

The obvious act of stupidity if you paid attention to what I wrote is that I saved the file to `.github/website-publish.yml` instead of `.github/workflows/website-publish.yml`. Fixing that was pretty easy when I figured out what was going on. After that I then had to tweak the deploy step a bit to make rsync work properly. I did a couple of things wrong with the deploy step, one I didn't specify a username, and two I didn't specify my source directory. The source directory thing was particularly stupid as I wanted the files inside the public folder but just putting ./public gave the folder itself with the files in it. As I removed that from my vps I deleted the `/var/www/pagwin.xyz` folder which required a brief recreation of that folder. Then I setup the source correctly to get the files properly but also set the target wrong so everything would go in a folder * which was annoying but at the end of all that I had a pretty smooth setup. Also when trying to copy my private key over to gh actions I struggled a little because I wanted to use xclip to put it in my clipboard but due to website being a different user I couldn't do that directly. This would've been fixed relatively easily if I realized this is why github's cli exists but oh well I eventually got it figured out.



## Conclusion

Overall I'm very happy I did this because it gave me a nice bit of practical understanding of how to set up Github actions for future projects. I hope reading about my technical spaghetti VPS and idiocy wasn't too boring. Oh yeah for those who care this is what the yaml file looked like in the end

```yaml

name: Website publish



on:

  push:

    branches:

      - master



jobs:

  build:

    runs-on: ubuntu-latest

    steps:

      - name: Code Checkout

        uses: actions/checkout@v2

        with:

          submodules: true

          fetch-depth: 0

      - name: Hugo Setup

        uses: peaceiris/actions-hugo@v2

        with:

          hugo-version: '0.91.2'

      - name: Build

        run: hugo --minify

      - name: Clean

        uses: appleboy/ssh-action@master

        with:

          host: pagwin.xyz

          username: website

          key: ${{secrets.SSH_KEY}}

          script: rm -rf /var/www/pagwin.xyz/*

      - name: Deploy

        uses: up9cloud/action-rsync@master

        env:

          HOST: pagwin.xyz

          USER: website

          KEY: ${{secrets.SSH_KEY}}

          SOURCE: ./public/*

          TARGET: /var/www/pagwin.xyz/

```
