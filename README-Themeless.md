## Theme vs Scheme
this is how I understand theme vs schemes. 
A theme is a higher level concept that like "ios" vs "material" that would control broader look and feel concepts.
As material.io puts it "system that combines theory, resources, and tools for crafting digital experiences."
The material.io does not really help however as it propogates the confusion a bit. 
A scheme is generally colors for fonts, icons and background. settings that are part of the theme but can be shared across themes. Its generally 
focused around color palletes with specific labels for bbackground, primary, secondary, accent, etc. You can see this in bootsrap for example and hundreds of others out there
material design light and its successor runs on simple schemes. https://material.io/color/ has a good tool
to setup schemes. 
In Vuetify there is a Contextuable mixin that is basically a way to set the scheme name on the componenet. 
I would propose its renamed to scheme for consitency. 
A theme deals with layout, location, sizing and more laf than just the color pallete. 
Basically whats configured in the _variables.style is the "theme" and how is setup out of the box.
