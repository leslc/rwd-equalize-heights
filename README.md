RWD EQUALIZE CHILDREN BASED ON PARENT ELEMENT CLASSES 

    USAGE:

      Direct children:

        <div class="equalize-children">
          <div class="equalize-group-{tag}">Child 1<br>line 1<br>line 2<br>line 3<br>line 4</div>
          <div class="equalize-group-{tag}">Child 2<br>line 1</div>
        </div>

      Direct children with RWD behavior (equalize happens only for certain screen sizes)

        <div class="equalize-children equalize-children-scr3-scr4">
          <div class="equalize-group-{tag}">Child 1<br>line 1<br>line 2<br>line 3<br>line 4</div>
          <div class="equalize-group-{tag}">Child 2<br>line 1</div>
        </div>

      Any children:

        <div class="equalize-children">
          <div>
            <div class="equalize-group-{tag}">line 1</div>
          </div>
          <div>
            <div class="equalize-group-{tag}">line 1<br>line 2<br>line 3<br>line 4</div>
          </div>
        </div>

      Multiple groupings:

        <div class="equalize-children">
          <div>
            <div class="equalize-group-{tag1}">line 1</div>
            <div class="equalize-group-{tag2}">line 1<br>line 2<br>line 3<br>line 4</div>
          </div>
          <div>
            <div class="equalize-group-{tag1}">line 1</div>
            <div class="equalize-group-{tag2}">line 1<br>line 2<br>line 3<br>line 4</div>
          </div>
        </div>


    INITIALIZATON:

      Note: You can use any classname instead of "equalize-children" to identify parent nodes

      Basic:

        $(document).ready(function() {
          $('div.equalize-children').equalizeChildren();
        });


      With default RWD behavior:

        $(document).ready(function() {
          $('div.equalize-children').equalizeChildren({'defaultRwd': 'scr3-scr4'});
        });


      With screen map:

        $(document).ready(function() {
          $('div.equalize-children').equalizeChildren({'screenMap': [ ... ] });
        });


    ARGUMENTS: 

      defaultRwd = If not specified by the "data-equalize-children-rwd" attribute, what is the default screens to equalize.
                   Dash separated list of default screen sizes, for example: "scr1-scr2" or "scr3-scr4"

      screenMap =  An object specifying the screen label (e.g. "scr1") and the corresponding minimum window width. This is evaluated in order, so list from highest breakpoint to lowest.
                   Last value is 0 as a catch all.

                   Default is:
                   [ {screen: 'scr4', minWidth: 990}, {screen: 'scr3', minWidth: 768}, {screen: 'scr2', minWidth: 480}, {screen: 'scr1', minWidth: 0} ]

  