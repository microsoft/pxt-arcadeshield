# The micro:bit "WhenDo" application

How can you introduce students to the features of the BBC micro:bit (V2)
and programming with just the micro:bit itself? The answer is this
simple "WhenDo" application, which is the brainchild of David Whale. 

Click [here](https://makecode.microbit.org/S09273-08316-87957-87908) to 
open the WhenDo application in MakeCode. 

Print out [this handout](./docs/whendo.pdf) for use in class. 

## How does it work?

The program allows you to specify an input event I and an output action O 
using just the A/B buttons of the micro:bit. Together, I and O make up 
a simple rule: 

- **When** input event I occurs **Do** output action O

The micro:bit will execute this rule forever until you reset it, so you
can create a new rule. Some events and actions use the micro:bit
radio, in which case you get to specify the radio group to use. Then
you can have multiple micro:bits (in a large group) work together!

### Input events

First, press the **A button** to cycle through the following *input events*
in the following order:

- A: press the A button
- B: press the B button
- S: shake the micro:bit
- F: hold screen face up
- U: hold screen face down
- D: see darkness (low light level)
- L: hear loud sound
- R: radio **receive** message
- E: press micro:bit emoticon
- P: press pin P0

When you find the input event you want, press the **B button** to accept it.

Each input event is displayed as an animation on the micro:bit screen,
which are presented below (or via a single letter, as shown above, 
depending on how you configure the application):

### Output actions

Now, press the **A button** to cycle through the following *output actions*:

- A: all LEDs on
- H: show happy face
- G: show grumpy face
- R: radio send message
- P: play doorbell sound
- S: play slide sound

When you find the output action you want press the **B button** to accept it.
The program will begin executing immediately, unless one of the input events 
or output actions is radio.

### Radio group

If you chose the radio receive input event or the radio send output action
then you will also need to specify the radio group (channel) that will be
used (1-16). This is especially useful if you are working in a large group with 
many micro:bits. Find your partner and agree on a radio group number. Write
it on the whiteboard so everyone else knows that number is being used.

Press the **A button** to cycle through the channels (1-16). Press the **B button**
to accept the current channel. Your program will now begin executing.

## Input event animations

### press the A button

```
    #         #   
    #       #   # 
#   #   #   # # # 
  # # #     #   #   
    #       #   # 
```

### press the B button

```
    #       # #   
    #       #   # 
#   #   #   # # # 
  # # #     #   #   
    #       # #   
```

### shake the micro:bit

```
    # #       # #       
        #   #         
#   #   #   #   #   #
#                   #
  # #           # # 
```

### hold screen face up

```
                #       
              # # #    
                   
  #   #       #   #    
# # # # #   # # # # #
```

### hold screen face down

```
# # # # #   # # # # #   
  #   #       #   #   
                   
              # # #   
                #   
```

### see darkness (low light level)

```
                      
                     
    #             
                  
                  .
```

### hear loud sound

```
              #       
  #         # #   #  
# #       # # # # 
  #         # #   #
              #   
```

### radio **receive** message

```
    #       # # #     
  #   #   #   #   #  
    #       # # #  
    #         #    
    #         #    
```

### press micro:bit emoticon

```
    #             
    #         # # # 
#   #   #   #       #
  # # #       # # #   
    #             
```

### press pin P0

```
    #         #   
    #       #   # 
#   #   #   #   # 
  # # #     #   #   
    #         #   
```

## Output action animations

### all LEDs on

```
# # # # #             
# # # # #            
# # # # #         
# # # # #         
# # # # #         
```

### show happy face

```

  #   #              
                  
#       #         
  # # #           
```

### show grumpy face

```                  

  #   #              
                  
  # # #           
#       #         
```

### radio send message

```
    #       # # #     
  #   #   #   #   #  
    #       # # #  
    #         #    
    #         #    
```

### play doorbell sound

```
                      
              #      
    #       #   # 
              #   
                      .
```

### play slide sound

```
#   # #   #           
  # # #     #   # #  
    #         # # #
      #         # 
        #         #
```
