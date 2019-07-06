using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Communicator : MonoBehaviour
{
    [Header("Text")]
    public TMPro.TextMeshProUGUI headline;
    public TMPro.TextMeshProUGUI subline;
    public TMPro.TextMeshProUGUI state;
    public Animator TextAnimator;

    string hl;
    string sl;
    string top;
    int countdown;

    public CountdownController CC;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        //if (Input.GetKeyDown(KeyCode.Space))
        //{
        //    ChangeText("Symbiosis|Verrückte Waldmenschen|15000|nope");
        //}
    }

    public string ChangeText(string input)
    {
        // Split from string into parameters
        string[] parameters = Split(input);
        Debug.Log("Headline: " + parameters[0] + " - Subline: " + parameters[1] + " Countdown: " + parameters[2]);

        // Start Animation
        TextAnimator.SetBool("fadeOut", true);

        // Change text
        hl = parameters[0];
        sl = parameters[1];
        string cd = parameters[2].ToString();
        countdown = System.Convert.ToInt32(cd);
        top = parameters[3];

        // Change Countdown
        if(countdown >= 1)
        {
            CC.SetCountdown(countdown);
        }

        Invoke("H_ChangeText", 1.5f);

        return "Funktioniert!";
    }

    public void H_ChangeText()
    {
        headline.text = hl;
        subline.text = sl;
        if(top == "teams")
        {
            state.text = "NEXT UP:";
        } else
        {
            state.text = " ";
        }
    }

    public string[] Split(string toSplit)
    {
        string[] splitString = toSplit.Split(new string[] { "|" }, System.StringSplitOptions.None);

        return splitString;
    }
}
