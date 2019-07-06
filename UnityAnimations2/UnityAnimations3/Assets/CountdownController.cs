using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CountdownController : MonoBehaviour
{
    public GameObject countdown;

    // Start is called before the first frame update
    void Start()
    {
        // StartCountdown();
    }

    // Update is called once per frame
    void Update()
    {

    }

    public void StartCountdown()
    {
        countdown.SetActive(true);
    }
}
