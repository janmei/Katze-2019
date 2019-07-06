using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Communicator : MonoBehaviour
{
    [Header("Text")]
    public TMPro.TextMeshProUGUI headline;
    public TMPro.TextMeshProUGUI subline;
    public TMPro.TextMeshProUGUI state;


    // Start is called before the first frame update
    void Start()
    {
        ChangeText("zuversicht|irgendeinesubline und so|2000");
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public string ChangeText(string input)
    {
        // Split from string into parameters
        string[] parameters = Split(input);
        Debug.Log("Headline: " + parameters[0] + " - Subline: " + parameters[1] + " Countdown: " + parameters[2]);

        // Change text
        headline.text = parameters[0];
        subline.text = parameters[1];        

        return "Funktioniert!";
    }

    public string[] Split(string toSplit)
    {
        string[] splitString = toSplit.Split(new string[] { "|" }, System.StringSplitOptions.None);

        return splitString;
    }
}
