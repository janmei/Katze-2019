using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;
using UnityEngine;

public class Restart : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown("space"))
        {
            print("space key was pressed");
            RestartTheShit();
        }
    }

    void RestartTheShit()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}
