using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CountdownController : MonoBehaviour
{
    [Header("Countdown GameObjects")]
    public GameObject countdown_small;
    public GameObject countdown_hype;

    [Header("Other Animations")]
    public Animator buildings;
    public Animator illustration;
    public Animator hype;
    public Animator text;

    int secondsUntilOver;

    // Start is called before the first frame update
    void Start()
    {
        // StartCountdown();
        SetCountdown(15000);
    }

    // Update is called once per frame
    void Update()
    {
        string updated = UpdateCoutdown();
        countdown_small.GetComponent<TMPro.TextMeshProUGUI>().text = updated;

        if (secondsUntilOver <= 12)
        {
            FadeOtherElementsOut();
        }
    }

    IEnumerator CountDown()
    {
        while (secondsUntilOver > 10)
        {
            if (secondsUntilOver <= 11)
            {
                StartHype();
            }
            --secondsUntilOver;
            yield return new WaitForSeconds(1);
        }
    }

    public string UpdateCoutdown()
    {        
        int minutes = secondsUntilOver / 60;
        int seconds = secondsUntilOver % 60;
        string m = minutes.ToString();
        string s = seconds.ToString();
        if (seconds < 10)
        {
            s = "0" + seconds;
        } else 
        if(minutes < 10)
        {
            m = "0" + minutes;
        }

        string uc = m + ":" + s; 
        return uc;
    }

    public void SetCountdown(int ms)
    {
        secondsUntilOver = (int) ms / 1000;
        StartCoroutine("CountDown");
    }

    public void StartHype()
    {
        hype.gameObject.SetActive(true);
        hype.SetBool("hype", true);
        countdown_small.SetActive(false);
        countdown_hype.SetActive(true);
    }

    public void FadeOtherElementsOut()
    {
        illustration.SetBool("fadeOut", true);
        buildings.SetBool("fadeOut", true);
        text.SetBool("stayOut", true);
    }
}
