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

    public GameObject overlay;

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
        // Input for testing
        if (Input.GetKeyDown(KeyCode.Space))
        {
            // ChangeText(" | |-1|nope");
            // StartTransitionToSlides();
        }
    }

    public void StartTransitionToSlides()
    {
        if (!overlay.activeSelf)
        {
            overlay.SetActive(true);
        } else
        {
            overlay.GetComponent<Animator>().SetTrigger("BackToSlide");
            Invoke("disableOverlay", 10);
        }
    }
    
    void disableOverlay()
    {
        overlay.SetActive(false);
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
        } else if(countdown == -1)
        {
            CC.EndCountdown();
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
        TextAnimator.SetBool("fadeOut", false);
    }

    public string[] Split(string toSplit)
    {
        string[] splitString = toSplit.Split(new string[] { "|" }, System.StringSplitOptions.None);

        return splitString;
    }
}
